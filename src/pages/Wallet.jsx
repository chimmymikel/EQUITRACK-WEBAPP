import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useContext, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import WalletOverview from "../components/WalletOverview";
import WalletList from "../components/WalletList";
import Modal from "../components/Modal";
import AddWalletForm from "../components/AddWalletForm";
import WalletTransactionForm from "../components/WalletTransactionForm";
import DeleteAlert from "../components/DeleteAlert";
import { AppContext } from "../context/AppContext";
import TransactionHistory from "../components/TransactionHistory";

const Wallet = () => {
    useUser();
    const { user } = useContext(AppContext);
    
    const [wallets, setWallets] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]); 

    const [openAddWalletModal, setOpenAddWalletModal] = useState(false);
    const [openTransactionModal, setOpenTransactionModal] = useState({ show: false, type: null, walletId: null });
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const profileId = user?.id;

    // --- FETCH FUNCTIONS (UNCHANGED) ---
    const fetchWallets = async () => {
        if (loading || !profileId) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ACTIVE_WALLETS(profileId));
            if (response.status === 200) setWallets(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch wallets");
        } finally {
            setLoading(false);
        }
    };

    const fetchTotalBalance = async () => {
        if (!profileId) return;
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_TOTAL_BALANCE(profileId));
            if (response.status === 200) setTotalBalance(response.data.totalBalance);
        } catch (error) { console.error(error); }
    };

    const fetchTransactions = async () => {
        if (!profileId) return;
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_TRANSACTIONS(profileId)); 
            if (response.status === 200) setTransactions(response.data); 
        } catch (error) { console.error(error); }
    };

    // --- HANDLERS (UNCHANGED) ---
    const handleAddWallet = async (walletData) => {
        const { walletType } = walletData;
        if (!walletType?.trim()) return toast.error("Please enter a wallet name");
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.CREATE_WALLET(profileId), { walletType });
            if (response.status === 200) {
                setOpenAddWalletModal(false);
                toast.success("Wallet created successfully");
                fetchWallets(); fetchTotalBalance();
            }
        } catch (error) { toast.error("Failed to create wallet"); }
    };

    const handleTransaction = async (walletId, amount, type) => {
        if (!amount || Number(amount) <= 0) return toast.error("Invalid amount");
        const endpoint = type === 'deposit' ? API_ENDPOINTS.DEPOSIT_WALLET(walletId) : API_ENDPOINTS.WITHDRAW_WALLET(walletId);
        try {
            const response = await axiosConfig.post(endpoint, { amount: Number(amount) });
            if (response.status === 200) {
                setOpenTransactionModal({ show: false, type: null, walletId: null });
                toast.success("Transaction successful");
                fetchWallets(); fetchTotalBalance(); fetchTransactions();
            }
        } catch (error) { toast.error("Transaction failed"); }
    };

    const deleteWallet = async (walletId) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_WALLET(walletId));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Wallet deleted");
            fetchWallets(); fetchTotalBalance(); fetchTransactions();
        } catch (error) { toast.error("Failed to delete wallet"); }
    };

    useEffect(() => {
        if (!profileId) return;
        fetchWallets(); fetchTotalBalance(); fetchTransactions();
    }, [profileId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-10 left-20 w-96 h-96 bg-blue-500 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            <Dashboard activeMenu="Wallets">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 border-b border-white/5 pb-6">
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">My Wallets</h1>
                            <p className="text-slate-400 mt-1 text-sm font-medium">Manage your assets and track your cash flow.</p>
                        </div>
                        <button 
                            onClick={() => setOpenAddWalletModal(true)}
                            className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 rounded-xl font-bold shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/30 hover:-translate-y-0.5 transition-all active:scale-95"
                        >
                            + Create Wallet
                        </button>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* LEFT COLUMN: Overview Cards + Wallet Grid (Spans 8 cols) */}
                        <div className="lg:col-span-8 space-y-8">
                            <WalletOverview 
                                totalBalance={totalBalance}
                                walletCount={wallets.length}
                            />
                            
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-yellow-400 rounded-full"></span>
                                    Your Accounts
                                </h3>
                                <WalletList
                                    wallets={wallets}
                                    onDeposit={(id) => setOpenTransactionModal({ show: true, type: 'deposit', walletId: id })}
                                    onWithdraw={(id) => setOpenTransactionModal({ show: true, type: 'withdraw', walletId: id })}
                                    onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: History Sidebar (Spans 4 cols) */}
                        <div className="lg:col-span-4">
                            {/* ✅ FIX: Removed the sticky wrapper so it stretches to match height */}
                            <TransactionHistory transactions={transactions} /> 
                        </div>
                    </div>

                    {/* Modals remain the same */}
                    <Modal isOpen={openAddWalletModal} onClose={() => setOpenAddWalletModal(false)} title="Create New Wallet">
                        <AddWalletForm onSubmit={handleAddWallet} />
                    </Modal>
                    <Modal isOpen={openTransactionModal.show} onClose={() => setOpenTransactionModal({ show: false, type: null, walletId: null })} title={openTransactionModal.type === 'deposit' ? 'Deposit Money' : 'Withdraw Money'}>
                        <WalletTransactionForm type={openTransactionModal.type} onSubmit={(amount) => handleTransaction(openTransactionModal.walletId, amount, openTransactionModal.type)} />
                    </Modal>
                    <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Wallet">
                        <DeleteAlert content="This action cannot be undone." onDelete={() => deleteWallet(openDeleteAlert.data)} />
                    </Modal>
                </div>
            </Dashboard>
        </div>
    );
};

export default Wallet;