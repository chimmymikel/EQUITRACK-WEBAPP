import { ArrowDown, ArrowUp, Trash2, Wallet } from "lucide-react";
import { addThousandsSeparator } from "../util/util";

const WalletList = ({ wallets, onDeposit, onWithdraw, onDelete }) => {
    if (wallets.length === 0) {
        return (
            <div className="rounded-3xl bg-slate-800/30 border border-dashed border-slate-700 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <Wallet className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-white font-bold text-lg">No wallets found</h3>
                <p className="text-slate-400 max-w-xs mt-2 text-sm">Create your first wallet to start tracking your finances.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wallets.map((wallet) => (
                <div 
                    key={wallet.id}
                    className="group flex flex-col rounded-3xl bg-slate-800/60 backdrop-blur-sm border border-white/5 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20"
                >
                    {/* Upper Content */}
                    <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20 text-white">
                                    <Wallet size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white leading-tight">{wallet.walletType}</h3>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        {wallet.currency || 'PHP'} Wallet
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(wallet.id); }}
                                className="text-slate-600 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition-colors"
                                title="Delete Wallet"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Available Balance</p>
                            <p className="text-3xl font-black text-white tracking-tight">
                                ₱{addThousandsSeparator(wallet.balance || 0)}
                            </p>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-2 border-t border-white/5 grid grid-cols-2 gap-2 bg-black/20 rounded-b-3xl">
                        <button
                            onClick={() => onDeposit(wallet.id)}
                            className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-green-500/10 text-slate-300 hover:text-green-400 font-bold text-sm transition-all group/btn"
                        >
                            <div className="p-1 rounded-full bg-slate-800 group-hover/btn:bg-green-500/20 transition-colors">
                                <ArrowDown size={14} strokeWidth={3} />
                            </div>
                            Deposit
                        </button>
                        <button
                            onClick={() => onWithdraw(wallet.id)}
                            className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-red-500/10 text-slate-300 hover:text-red-400 font-bold text-sm transition-all group/btn"
                        >
                            <div className="p-1 rounded-full bg-slate-800 group-hover/btn:bg-red-500/20 transition-colors">
                                <ArrowUp size={14} strokeWidth={3} />
                            </div>
                            Withdraw
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WalletList;