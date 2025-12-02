import { ArrowDown, ArrowUp, Trash2, Wallet } from "lucide-react";
import { addThousandsSeparator } from "../util/util";

const WalletList = ({ wallets, onDeposit, onWithdraw, onDelete }) => {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-black text-white tracking-tight">My Wallets</h5>
            </div>

            {wallets.length === 0 ? (
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-700/30 mb-4">
                        <Wallet className="w-10 h-10 text-gray-400" strokeWidth={2.5} />
                    </div>
                    <p className="text-gray-400 font-medium">No wallets yet</p>
                    <p className="text-gray-500 text-sm mt-1">Create your first wallet to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wallets.map((wallet) => (
                        <div 
                            key={wallet.id}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 backdrop-blur-sm border border-white/10 p-5 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Delete button */}
                            <button
                                onClick={() => onDelete(wallet.id)}
                                className="absolute top-3 right-3 p-2 bg-slate-800/50 hover:bg-red-600/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/10 hover:border-red-400/30"
                            >
                                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" strokeWidth={2.5} />
                            </button>

                            {/* Wallet Icon */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-lg">
                                    <Wallet className="w-6 h-6 text-white" strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <h6 className="text-white font-black tracking-tight">{wallet.walletType}</h6>
                                    <p className="text-gray-400 text-xs font-medium">Wallet</p>
                                </div>
                            </div>

                            {/* Balance */}
                            <div className="mb-4">
                                <p className="text-gray-400 text-xs font-medium mb-1">Current Balance</p>
                                <p className="text-2xl font-black text-white tracking-tight">
                                    ₱{addThousandsSeparator(wallet.balance || 0)}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onDeposit(wallet.id)}
                                    className="flex-1 px-4 py-2.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 font-bold rounded-xl border border-green-600/30 hover:border-green-600/50 transition-all inline-flex items-center justify-center gap-2"
                                >
                                    <ArrowDown size={16} strokeWidth={2.5} />
                                    Deposit
                                </button>
                                <button
                                    onClick={() => onWithdraw(wallet.id)}
                                    className="flex-1 px-4 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold rounded-xl border border-red-600/30 hover:border-red-600/50 transition-all inline-flex items-center justify-center gap-2"
                                >
                                    <ArrowUp size={16} strokeWidth={2.5} />
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WalletList;