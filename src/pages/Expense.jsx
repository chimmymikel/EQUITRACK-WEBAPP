import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    // Fetch expense details
    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                const expenseArray =
                    response.data?.data ||
                    response.data?.expenses ||
                    response.data || [];
                setExpenseData(expenseArray);
            }
        } catch (error) {
            console.error('Failed to fetch expense details:', error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    }

    // Fetch categories
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) setCategories(response.data);
        } catch (error) {
            console.error('Failed to fetch expense categories:', error);
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    }

    // Add expense
    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

        if (!name.trim()) return toast.error("Please enter a name");
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be greater than 0");
        if (!date) return toast.error("Please select a date");
        if (!categoryId) return toast.error("Please select a category");
        if (date > new Date().toISOString().split('T')[0]) return toast.error("Date cannot be in the future");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            });

            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    }

    // Delete expense
    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error('Error deleting expense:', error);
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    }

    // Download Excel
    const handleDownloadExpenseDetails = async () => {
        let loadingToast;

        try {
            loadingToast = toast.loading("Downloading expense details...");

            const response = await axiosConfig.get(
                API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
                {
                    responseType: "arraybuffer",
                    timeout: 30000,
                    headers: {
                        "Content-Type": "application/octet-stream",
                        Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    },
                }
            );

            toast.dismiss(loadingToast);

            // Extract filename
            let filename = "expense_details.xlsx";
            const contentDisposition = response.headers["content-disposition"];

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+)"?/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }

            // Create Blob
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Expense details downloaded successfully");

        } catch (error) {
            if (loadingToast) toast.dismiss(loadingToast);

            console.error("Error downloading expense details:", error);

            // Handle server error returned as Blob
            if (error.response?.data instanceof Blob) {
                try {
                    const text = await error.response.data.text();
                    const json = JSON.parse(text);
                    toast.error(json.message || "Failed to download expense details");
                    return;
                } catch (e) {}
            }

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.code === "ECONNABORTED") {
                toast.error("Download timeout - please try again");
            } else if (!error.response) {
                toast.error("Network error - please check your connection");
            } else {
                toast.error("Failed to download expense details");
            }
        }
    };

    // Email Excel
    const handleEmailExpenseDetails = async () => {
        let loadingToast;
        try {
            loadingToast = toast.loading("Sending expense details...");
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);

            toast.dismiss(loadingToast);

            if (response.status === 200 && response.data.success) {
                toast.success(response.data.message || "Expense details emailed successfully");
            } else {
                toast.error(response.data.message || "Failed to email expense details");
            }
        } catch (error) {
            if (loadingToast) toast.dismiss(loadingToast);
            console.error("Error emailing expense details:", error);
            toast.error(error.response?.data?.message || "Failed to email expense details");
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
                    </div>

                    <ExpenseList 
                        transactions={expenseData} 
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
                        <AddExpenseForm onAddExpense={handleAddExpense} categories={categories} />
                    </Modal>

                    <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Expense">
                        <DeleteAlert content="Are you sure you want to delete this expense details?" onDelete={() => deleteExpense(openDeleteAlert.data)} />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    );
};

export default Expense;