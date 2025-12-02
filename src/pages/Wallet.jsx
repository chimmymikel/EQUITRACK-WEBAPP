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

const Wallet = () => {
    useUser();
    const { user } = useContext(AppContext);
    
    const [wallets, setWallets] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const [openAddWalletModal, setOpenAddWalletModal] = useState(false);
    const [openTransactionModal, setOpenTransactionModal] = useState({ show: false, type: null, walletId: null });
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const profileId = user?.id;

    // Fetch all wallets
    const fetchWallets = async () => {
        if (loading || !profileId) return;
        setLoading(true);

        try {
            console.log('Fetching wallets for profile:', profileId);
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ACTIVE_WALLETS(profileId));
            if (response.status === 200) {
                setWallets(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch wallets:', error);
            toast.error(error.response?.data?.message || "Failed to fetch wallets");
        } finally {
            setLoading(false);
        }
    };

    // Fetch total balance
    const fetchTotalBalance = async () => {
        if (!profileId) return;
        
        try {
            console.log('Fetching total balance for profile:', profileId);
            const response = await axiosConfig.get(API_ENDPOINTS.GET_TOTAL_BALANCE(profileId));
            if (response.status === 200) {
                setTotalBalance(response.data.totalBalance);
            }
        } catch (error) {
            console.error('Failed to fetch total balance:', error);
        }
    };

    // Create new wallet
    const handleAddWallet = async (walletData) => {
        const { walletType } = walletData;

        if (!walletType || !walletType.trim()) {
            return toast.error("Please enter a wallet name");
        }

        if (!profileId) {
            return toast.error("User profile not found. Please refresh and try again.");
        }

        try {
            console.log('Creating wallet for profile:', profileId);
            const response = await axiosConfig.post(API_ENDPOINTS.CREATE_WALLET(profileId), {
                walletType
            });

            if (response.status === 200) {
                setOpenAddWalletModal(false);
                toast.success("Wallet created successfully");
                fetchWallets();
                fetchTotalBalance();
            }
        } catch (error) {
            console.error('Error creating wallet:', error);
            toast.error(error.response?.data?.message || error.response?.data || "Failed to create wallet");
        }
    };

    // Handle deposit
    const handleDeposit = async (walletId, amount) => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            return toast.error("Amount must be greater than 0");
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.DEPOSIT_WALLET(walletId), {
                amount: Number(amount)
            });

            if (response.status === 200) {
                setOpenTransactionModal({ show: false, type: null, walletId: null });
                toast.success("Deposit successful");
                fetchWallets();
                fetchTotalBalance();
            }
        } catch (error) {
            console.error('Error depositing:', error);
            toast.error(error.response?.data?.message || "Failed to deposit");
        }
    };

    // Handle withdraw
    const handleWithdraw = async (walletId, amount) => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            return toast.error("Amount must be greater than 0");
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.WITHDRAW_WALLET(walletId), {
                amount: Number(amount)
            });

            if (response.status === 200) {
                setOpenTransactionModal({ show: false, type: null, walletId: null });
                toast.success("Withdrawal successful");
                fetchWallets();
                fetchTotalBalance();
            }
        } catch (error) {
            console.error('Error withdrawing:', error);
            toast.error(error.response?.data?.message || "Failed to withdraw");
        }
    };

    // Delete wallet
    const deleteWallet = async (walletId) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_WALLET(walletId));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Wallet deleted successfully");
            fetchWallets();
            fetchTotalBalance();
        } catch (error) {
            console.error('Error deleting wallet:', error);
            toast.error(error.response?.data?.message || "Failed to delete wallet");
        }
    };

    useEffect(() => {
        if (!profileId) {
            console.log('⏳ Waiting for user profile...');
            return;
        }
        
        console.log('✅ Profile ID loaded:', profileId);
        fetchWallets();
        fetchTotalBalance();
    }, [profileId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 relative overflow-hidden">
            {/* Background Effects matching landing page */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-1/4 left-10 md:left-20 w-80 h-80 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 right-10 md:right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            <Dashboard activeMenu="Wallets">
                <div className="my-5 mx-auto relative z-10">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Wallet Overview */}
                        <WalletOverview 
                            totalBalance={totalBalance}
                            walletCount={wallets.length}
                            onAddWallet={() => setOpenAddWalletModal(true)}
                        />

                        {/* Wallet List */}
                        <WalletList
                            wallets={wallets}
                            onDeposit={(walletId) => setOpenTransactionModal({ show: true, type: 'deposit', walletId })}
                            onWithdraw={(walletId) => setOpenTransactionModal({ show: true, type: 'withdraw', walletId })}
                            onDelete={(walletId) => setOpenDeleteAlert({ show: true, data: walletId })}
                        />

                        {/* Add Wallet Modal */}
                        <Modal 
                            isOpen={openAddWalletModal} 
                            onClose={() => setOpenAddWalletModal(false)} 
                            title="Create New Wallet"
                        >
                            <AddWalletForm onSubmit={handleAddWallet} />
                        </Modal>

                        {/* Transaction Modal (Deposit/Withdraw) */}
                        <Modal 
                            isOpen={openTransactionModal.show} 
                            onClose={() => setOpenTransactionModal({ show: false, type: null, walletId: null })} 
                            title={openTransactionModal.type === 'deposit' ? 'Deposit Money' : 'Withdraw Money'}
                        >
                            <WalletTransactionForm 
                                type={openTransactionModal.type}
                                onSubmit={(amount) => {
                                    if (openTransactionModal.type === 'deposit') {
                                        handleDeposit(openTransactionModal.walletId, amount);
                                    } else {
                                        handleWithdraw(openTransactionModal.walletId, amount);
                                    }
                                }}
                            />
                        </Modal>

                        {/* Delete Confirmation */}
                        <Modal 
                            isOpen={openDeleteAlert.show} 
                            onClose={() => setOpenDeleteAlert({ show: false, data: null })} 
                            title="Delete Wallet"
                        >
                            <DeleteAlert 
                                content="Are you sure you want to delete this wallet? This action cannot be undone." 
                                onDelete={() => deleteWallet(openDeleteAlert.data)} 
                            />
                        </Modal>
                    </div>
                </div>
            </Dashboard>
        </div>
    );
};

export default Wallet;