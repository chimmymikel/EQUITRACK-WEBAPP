import { WalletCards, TrendingUp, TrendingDown, Wallet, ArrowRight, CreditCard, Plus } from "lucide-react"; 
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { addThousandsSeparator } from "../util/util";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";

// Import Components
import InfoCard from "../components/InfoCard";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
    useUser();
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [dashboardData, setDashboardData] = useState(null);
    const [wallets, setWallets] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Dashboard Data and Wallets in parallel
                const [dashboardRes, walletRes] = await Promise.all([
                    axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA),
                    user?.id ? axiosConfig.get(API_ENDPOINTS.GET_ACTIVE_WALLETS(user.id)) : Promise.resolve({ data: [] })
                ]);

                if (dashboardRes.status === 200) setDashboardData(dashboardRes.data);
                if (walletRes.status === 200) setWallets(walletRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    const recentTransactions = dashboardData?.recentTransactions || [];
    const recentExpenses = dashboardData?.recent5Expenses || [];
    const recentIncomes = dashboardData?.recent5Incomes || [];

    const getFirstName = () => {
        if (!user) return null;
        if (user.firstName) return user.firstName;
        if (user.fullName) return user.fullName.split(' ')[0];
        return user.username;
    };
    const displayName = getFirstName();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 relative overflow-hidden text-white">
            
            {/* Ambient Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-10 md:left-20 w-96 h-96 bg-yellow-400/25 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 md:right-20 w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <Dashboard activeMenu="Dashboard">
                <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pb-20">
                    
                    {/* Header (Preserved) */}
                    <div className="pt-10 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md leading-tight">
                                Welcome to Equi<span className="text-yellow-400">Track</span>{displayName && `, ${displayName}`}!
                            </h1>
                            <p className="text-slate-300/80 mt-2 text-base font-medium">Here is your financial overview for today.</p>
                        </div>
                        
                        <div className="hidden md:block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 backdrop-blur-md shadow-sm">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    {loading ? (
                        /* Skeleton Loader */
                        <div className="animate-pulse space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[1,2,3].map(i => <div key={`skel-top-${i}`} className="h-40 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"></div>)}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {[1,2].map(i => <div key={`skel-mid-${i}`} className="h-[450px] bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"></div>)}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1,2].map(i => <div key={`skel-bot-${i}`} className="h-96 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"></div>)}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            
                            {/* 1. Top Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                <div className="h-full transform transition-all duration-300 hover:-translate-y-1">
                                    <InfoCard 
                                        label="Total Balance" 
                                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)} 
                                        icon={<WalletCards className="text-purple-300 w-6 h-6" />}
                                    />
                                </div>
                                <div className="h-full transform transition-all duration-300 hover:-translate-y-1">
                                    <InfoCard 
                                        label="Total Income" 
                                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)} 
                                        icon={<TrendingUp className="text-emerald-300 w-6 h-6" />}
                                    />
                                </div>
                                <div className="h-full transform transition-all duration-300 hover:-translate-y-1">
                                    <InfoCard 
                                        label="Total Expense" 
                                        value={addThousandsSeparator(dashboardData?.totalExpense || 0)} 
                                        icon={<TrendingDown className="text-rose-300 w-6 h-6" />}
                                    />
                                </div>
                            </div>

                            {/* 2. Middle Section (Overview & Recent Transactions) */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                                <div className="h-full min-h-[450px]">
                                    <FinanceOverview 
                                        totalBalance={dashboardData?.totalBalance || 0}
                                        totalIncome={dashboardData?.totalIncome || 0}
                                        totalExpense={dashboardData?.totalExpense || 0}
                                    />
                                </div>
                                <div className="h-full min-h-[450px]">
                                    <RecentTransactions 
                                        transactions={recentTransactions} 
                                        onMore={() => navigate("/expense")} 
                                    />
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="flex items-center gap-4 pt-4 opacity-80">
                                <h2 className="text-xl font-semibold text-white tracking-wide">Detailed Activity</h2>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                            </div>

                            {/* 3. Bottom Section (Expense/Income Lists) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                                <div className="h-full">
                                    <Transactions 
                                        transactions={recentExpenses} 
                                        type="expense" 
                                        title="Recent Expenses"
                                        onMore={() => navigate("/expense")}
                                    />
                                </div>
                                <div className="h-full">
                                    <Transactions 
                                        transactions={recentIncomes} 
                                        type="income" 
                                        title="Recent Incomes"
                                        onMore={() => navigate("/income")}
                                    />
                                </div>
                            </div>

                            {/* 4. IMPROVED FINANCIAL ASSETS SECTION */}
                            {wallets.length > 0 && (
                                <div className="mt-8 pt-10 border-t border-white/10 animate-fade-in">
                                    {/* Section Header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                                                <Wallet size={22} className="text-blue-400" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white tracking-wide">Financial Assets</h2>
                                                <p className="text-slate-400 text-sm">Your active wallets and balances</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => navigate('/wallets')}
                                            className="text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1 group bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/5 hover:border-white/20"
                                        >
                                            Manage All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    
                                    {/* Premium Wallet Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {wallets.map((wallet) => (
                                            <div 
                                                key={wallet.id}
                                                onClick={() => navigate('/wallets')}
                                                className="group relative overflow-hidden h-[180px] rounded-3xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md"
                                            >
                                                {/* Card Background Glow */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full opacity-40 group-hover:opacity-80 transition-all duration-500"></div>

                                                <div className="relative z-10 flex flex-col h-full justify-between">
                                                    {/* Top Row: Icon & Chip */}
                                                    <div className="flex justify-between items-start">
                                                        <div className="p-3 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                            <CreditCard size={20} className="text-blue-300 drop-shadow-md" />
                                                        </div>
                                                        {/* Currency Pill */}
                                                        <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-black/30 border border-white/10 text-slate-400 uppercase tracking-widest group-hover:text-white group-hover:border-blue-400/30 transition-all">
                                                            {wallet.currency}
                                                        </span>
                                                    </div>

                                                    {/* Bottom Row: Details */}
                                                    <div>
                                                        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 truncate group-hover:text-blue-200 transition-colors">
                                                            {wallet.walletType}
                                                        </h3>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-lg text-slate-500 font-semibold group-hover:text-blue-300 transition-colors">₱</span>
                                                            <h4 className="text-3xl font-black text-white tracking-tighter drop-shadow-lg">
                                                                {addThousandsSeparator(wallet.balance)}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* "Add New" Ghost Card */}
                                        <div 
                                            onClick={() => navigate('/wallets')}
                                            className="h-[180px] rounded-3xl border-2 border-dashed border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 group"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-400/20 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-yellow-400/10">
                                                <Plus size={24} className="text-slate-500 group-hover:text-yellow-400 transition-colors" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-500 group-hover:text-yellow-400 transition-colors tracking-wide uppercase text-xs">Create New Wallet</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </Dashboard>
        </div>
    );
};

export default Home;