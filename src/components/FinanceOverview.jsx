import React from 'react';
import { addThousandsSeparator } from "../util/util"; 
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    // NEW VIBRANT NEON PALETTE
    // Electric Violet, Neon Pink-Red, Neon Green
    const COLORS = ["#8257E5", "#FF3366", "#00E676"]; 

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    const hasData = balanceData.some(item => item.amount > 0);
    
    return (
        <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
            
            {/* HEADER */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <h2 className="text-lg font-bold text-white tracking-wide">Financial Overview</h2>
            </div>

            {/* BODY */}
            <div className="p-6 md:p-8 flex-1 w-full flex flex-col">
                
                {/* Total Balance */}
                <div className="mb-6">
                    <p className="text-sm text-slate-400 font-medium mb-1">Total Balance</p>
                    <p className="text-3xl md:text-4xl font-bold text-slate-200 tracking-tight">
                        ₱{addThousandsSeparator(totalBalance)}
                    </p>
                </div>

                {hasData ? (
                    <CustomPieChart 
                        data={balanceData}
                        colors={COLORS}
                    />
                ) : (
                    /* Empty State */
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70 gap-4 py-10">
                        <div className="w-24 h-24 rounded-full bg-slate-800/50 border border-slate-700 border-dashed flex items-center justify-center">
                           <span className="text-3xl">📊</span>
                        </div>
                        <p className="text-slate-300 font-medium">No financial data yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinanceOverview;