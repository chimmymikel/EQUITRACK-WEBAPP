import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Construction, Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";
// Removed unused axios import

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    //Fetch income details from the API
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch income details:', error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    }

    //Fetch categories for income
    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                console.log('income categories', response.data);
                setCategories(response.data);
            }
        } catch (error) {
            console.log('Failed to fetch income categories:', error);
            toast.error(error.response?.data?.message || "Failed to fetch income categories"); // Fixed: error.data -> error.response.data
        }
    }

    //save the income details
    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;

        //validation
        if (!name.trim()) {
            toast.error("Please enter a name");
            return; // Added return
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error("Date cannot be in the future");
            return;
        }

        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            })
            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error) {
            console.log('Error adding income', error);
            toast.error(error.response?.data?.message || "Failed to add income"); // Fixed: "Failed to adding income" -> "Failed to add income"
        }
    }

    //delete income details - Fixed: Added id parameter
    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.log('Error deleting income', error);
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    }

    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, { responseType: "blob" });
            
            // Create download link
            let filename = "income_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            toast.success("Download income details successfully");

        } catch (error) {
            console.error('Error downloading income details:', error);

            // --- START OF FIX ---
            // 1. Check if the error data is a Blob (which happens because of responseType: 'blob')
            if (error.response?.data instanceof Blob) {
                const reader = new FileReader();

                // 2. Once the reader loads, parse the text back to JSON
                reader.onload = (e) => {
                    try {
                        const errorData = JSON.parse(e.target.result);
                        toast.error(errorData.message || "Failed to download income");
                    } catch (jsonError) {
                        // If parsing fails, show a generic error
                        toast.error("Failed to download income");
                    }
                };

                // 3. Trigger the reader
                reader.readAsText(error.response.data);
            } else {
                // Fallback for standard errors (like network issues)
                toast.error(error.response?.data?.message || "Failed to download income");
            }
            // --- END OF FIX ---
        }
    }

    const handleEmailIncomeDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if (response.status === 200){
                toast.success("Income details emailed successfully");
            }
        }catch(error) {
            console.error('Error emailing income details:', error);
            toast.error(error.response?.data?.message || "Failed to email income");
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/*overview for income with line char */}
                        
                        <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
                    </div>

                    <IncomeList 
                        transactions={incomeData} 
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadIncomeDetails}
                        onEmail={handleEmailIncomeDetails}
                    />

                    {/* Add Income Modal */}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>

                    {/* Delete Income Modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Income"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this income details?"
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    );
};

export default Income;