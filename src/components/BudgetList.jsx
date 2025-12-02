import { Target, Trash2, TrendingUp, Calendar } from "lucide-react";
import { addThousandsSeparator } from "../util/util";

const BudgetList = ({ budgets, onDelete }) => {
    // Calculate progress percentage
    const getProgressColor = (percentage) => {
        if (percentage >= 100) return 'bg-red-500';
        if (percentage >= 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getProgressBorderColor = (percentage) => {
        if (percentage >= 100) return 'border-red-500/50';
        if (percentage >= 80) return 'border-yellow-500/50';
        return 'border-green-500/50';
    };

    return (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-black text-white tracking-tight">My Budgets</h5>
            </div>

            {budgets.length === 0 ? (
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-700/30 mb-4">
                        <Target className="w-10 h-10 text-gray-400" strokeWidth={2.5} />
                    </div>
                    <p className="text-gray-400 font-medium">No budgets yet</p>
                    <p className="text-gray-500 text-sm mt-1">Create your first budget to start tracking</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budgets.map((budget) => {
                        // Use calculated spending from parent component
                        const spent = budget.currentSpending || 0;
                        const remaining = budget.remainingAmount || budget.limitAmount;
                        const percentage = budget.percentageUsed || 0;

                        // Log for debugging
                        console.log(`Budget ${budget.category?.name}:`, {
                            spent,
                            limit: budget.limitAmount,
                            percentage: percentage.toFixed(1) + '%'
                        });

                        return (
                            <div 
                                key={budget.id}
                                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 backdrop-blur-sm border ${getProgressBorderColor(percentage)} p-5 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02]`}
                            >
                                {/* Delete button */}
                                <button
                                    onClick={() => onDelete(budget.id)}
                                    className="absolute top-3 right-3 p-2 bg-slate-800/50 hover:bg-red-600/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/10 hover:border-red-400/30"
                                >
                                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" strokeWidth={2.5} />
                                </button>

                                {/* Category Icon & Info */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-600 to-green-800 shadow-lg">
                                        {budget.category?.icon ? (
                                            <img src={budget.category.icon} alt={budget.category.name} className="w-6 h-6" />
                                        ) : (
                                            <Target className="w-6 h-6 text-white" strokeWidth={2.5} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="text-white font-black tracking-tight">{budget.category?.name || 'Category'}</h6>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar className="w-3 h-3 text-gray-400" strokeWidth={2.5} />
                                            <p className="text-gray-400 text-xs font-medium">{budget.period}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Budget Limit */}
                                <div className="mb-4">
                                    <p className="text-gray-400 text-xs font-medium mb-1">Budget Limit</p>
                                    <p className="text-2xl font-black text-white tracking-tight">
                                        ₱{addThousandsSeparator(budget.limitAmount || 0)}
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400 font-medium">Spent</span>
                                        <span className="text-xs text-white font-bold">
                                            ₱{addThousandsSeparator(spent)} / {percentage.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                                        <div 
                                            className={`h-full ${getProgressColor(percentage)} transition-all duration-500`}
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Remaining Amount */}
                                <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-white/10">
                                    <span className="text-gray-400 font-medium">Remaining</span>
                                    <span className={`font-bold ${remaining < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                        ₱{addThousandsSeparator(Math.abs(remaining))}
                                        {remaining < 0 && ' over'}
                                    </span>
                                </div>

                                {/* Description if exists */}
                                {budget.description && (
                                    <p className="text-xs text-gray-400 mt-3 line-clamp-2">{budget.description}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default BudgetList;