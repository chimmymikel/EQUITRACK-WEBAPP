import { Plus, Wallet } from "lucide-react";
import { addThousandsSeparator } from "../util/util";

const WalletOverview = ({ totalBalance, walletCount, onAddWallet }) => {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h5 className="text-xl font-black text-white tracking-tight">
                        Wallet Overview
                    </h5>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                        Manage your wallets and track your total balance
                    </p>
                </div>
                <button 
                    className="px-5 py-2.5 bg-yellow-400 text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all inline-flex items-center gap-2" 
                    onClick={onAddWallet}
                >
                    <Plus size={18} strokeWidth={2.5} /> New Wallet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Balance Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border border-purple-400/30 p-6 hover:border-purple-400/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-gray-400 text-sm font-medium mb-2">Total Balance</p>
                            <p className="text-4xl font-black text-white tracking-tight">₱{addThousandsSeparator(totalBalance || 0)}</p>
                            <p className="text-purple-400 text-xs font-semibold mt-2">Across all wallets</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Wallet className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Wallet Count Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-400/30 p-6 hover:border-blue-400/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-gray-400 text-sm font-medium mb-2">Active Wallets</p>
                            <p className="text-4xl font-black text-white tracking-tight">{walletCount}</p>
                            <p className="text-blue-400 text-xs font-semibold mt-2">Currently active</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Wallet className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletOverview;