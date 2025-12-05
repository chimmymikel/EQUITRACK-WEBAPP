import { ArrowRight, LayoutDashboard, PlusCircle } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RecentTransactions = ({ transactions, onMore }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col h-full min-h-[450px]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <h3 className="font-bold text-lg text-white tracking-wide">Recent Transactions</h3>
                {transactions && transactions.length > 0 && (
                    <button 
                        onClick={onMore} 
                        className="text-sm text-yellow-400 hover:text-yellow-300 font-bold flex items-center gap-1 transition-colors"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="flex-1 flex flex-col p-4">
                {transactions && transactions.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {transactions.slice(0, 5).map((item, index) => (
                            <TransactionInfoCard 
                                // UNIQUE KEY FIX:
                                key={`recent-${item.id}-${index}`} 
                                title={item.name}
                                icon={item.icon}
                                date={moment(item.date).format("Do MMM YYYY")}
                                amount={item.amount}
                                type={item.type}
                                hideDeleteBtn
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-90">
                        <div className="bg-slate-800/50 p-4 rounded-full mb-4 border border-white/5 shadow-inner">
                            <LayoutDashboard className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-300 text-sm font-medium mb-6 max-w-[200px]">
                            No recent activity found. Start tracking today!
                        </p>
                        <button 
                            onClick={() => navigate('/expense')}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all"
                        >
                            <PlusCircle className="w-4 h-4" /> 
                            Add New Record
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;