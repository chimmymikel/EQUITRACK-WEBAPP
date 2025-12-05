import { WalletCards, TrendingUp, TrendingDown } from "lucide-react";
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
                if (response.status === 200) {
                    setDashboardData(response.data);
                }
            } catch (error) {
                console.error("Error fetching dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 relative overflow-hidden font-sans text-white">
            
            {/* Ambient Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-10 md:left-20 w-96 h-96 bg-yellow-400/25 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 md:right-20 w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <Dashboard activeMenu="Dashboard">
                <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pb-20">
                    
                    {/* Header */}
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
                                {[1,2,3].map(i => (
                                    <div key={`skel-top-${i}`} className="h-40 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"></div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {[1,2].map(i => (
                                    <div key={`skel-mid-${i}`} className="h-[450px] bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"></div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1,2].map(i => (
                                    <div key={`skel-bot-${i}`} className="h-96 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"></div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 md:space-y-10">
                            
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

                        </div>
                    )}
                </div>
            </Dashboard>
        </div>
    );
};

export default Home;