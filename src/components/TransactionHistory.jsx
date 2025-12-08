import { TrendingDown, TrendingUp, Clock, Activity } from "lucide-react";
import { addThousandsSeparator } from "../util/util"; 

const TransactionHistory = ({ transactions }) => {
    return (
        // ✅ UPDATED CONTAINER: Matches the "Glass Card" style of your Dashboard widgets
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full flex flex-col shadow-lg">
            
            {/* Header Section - Matches Dashboard Headers */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2 bg-slate-800 rounded-lg shadow-inner">
                    <Activity size={18} className="text-yellow-400" />
                </div>
                <h5 className="text-lg font-bold text-white tracking-wide">Recent Activity</h5>
            </div>

            {/* Content Area */}
            {transactions.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                    <div className="w-14 h-14 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 shadow-inner border border-white/5">
                        <Clock className="w-6 h-6 text-slate-500" />
                    </div>
                    <p className="text-slate-300 font-semibold text-sm">No activity recorded</p>
                    <p className="text-slate-500 text-xs mt-1 max-w-[150px]">Transactions will appear here.</p>
                </div>
            ) : (
                <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {transactions.map((tx) => {
                        const isDeposit = tx.type === 'DEPOSIT' || tx.type === 'TRANSFER_IN';
                        
                        return (
                            <div key={tx.id} className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] transition-all border border-transparent hover:border-white/5 cursor-default">
                                <div className="flex items-center gap-3.5">
                                    {/* Icon Container */}
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                                        isDeposit 
                                            ? 'bg-gradient-to-br from-green-500/10 to-green-900/20 text-green-400 border border-green-500/10' 
                                            : 'bg-gradient-to-br from-red-500/10 to-red-900/20 text-red-400 border border-red-500/10'
                                    }`}>
                                        {isDeposit ? <TrendingDown size={18} /> : <TrendingUp size={18} />}
                                    </div>
                                    
                                    {/* Text Info */}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                                            {isDeposit ? 'Money In' : 'Money Out'}
                                        </span>
                                        <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide group-hover:text-slate-400 transition-colors">
                                            {tx.wallet?.walletType || 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Amount & Date */}
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${isDeposit ? 'text-green-400' : 'text-red-400'}`}>
                                        {isDeposit ? '+' : '-'}₱{addThousandsSeparator(Math.abs(tx.amount))}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                        {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;