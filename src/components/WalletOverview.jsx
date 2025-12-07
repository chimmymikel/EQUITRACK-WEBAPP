import { Wallet, PieChart, TrendingUp } from "lucide-react";
import { addThousandsSeparator } from "../util/util";

const WalletOverview = ({ totalBalance, walletCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Balance */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/90 to-slate-900/90 backdrop-blur-md border border-white/10 p-6 shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Wallet size={100} className="text-white" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                            <Wallet className="w-5 h-5 text-indigo-300" />
                        </div>
                        <span className="text-indigo-200 font-semibold text-xs tracking-wider uppercase">Total Balance</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-slate-400 mt-1">₱</span>
                        <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                            {addThousandsSeparator(totalBalance || 0)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Active Wallets */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border border-white/10 p-6 shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <PieChart size={100} className="text-teal-400" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-teal-500/20 rounded-lg border border-teal-500/30">
                            <PieChart className="w-5 h-5 text-teal-300" />
                        </div>
                        <span className="text-teal-200 font-semibold text-xs tracking-wider uppercase">Active Wallets</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                            {walletCount}
                        </span>
                        <span className="text-lg font-medium text-slate-500">Accounts</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletOverview;