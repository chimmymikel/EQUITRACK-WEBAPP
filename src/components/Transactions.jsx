import { ArrowRight, LayoutDashboard, PlusCircle } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";
import { useNavigate } from "react-router-dom";

const Transactions = ({ transactions, onMore, type, title }) => {
    const navigate = useNavigate();
    const colorClass = type === 'income' ? 'from-emerald-500 to-green-600' : 'from-rose-500 to-red-600';
    const btnLabel = type === 'income' ? 'Add Income' : 'Add Expense';

    return (
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col h-full min-h-[350px]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <h5 className="font-bold text-lg text-white tracking-wide">{title}</h5>
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
                              key={`trans-${type}-${item.id}-${index}`}
                              title={item.name}
                              icon={item.icon}
                              date={moment(item.date).format("Do MMM YYYY")}
                              amount={item.amount}
                              type={type}
                              hideDeleteBtn                            
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center opacity-90">
                        <div className="bg-slate-800/50 p-3 rounded-full mb-3 border border-white/5 shadow-inner">
                            <LayoutDashboard className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-slate-300 text-sm font-medium mb-4 max-w-[200px]">
                            No records found.
                        </p>
                        <button 
                            onClick={onMore}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg bg-gradient-to-r ${colorClass} hover:scale-105 transition-all`}
                        >
                            <PlusCircle className="w-3.5 h-3.5" /> 
                            {btnLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;