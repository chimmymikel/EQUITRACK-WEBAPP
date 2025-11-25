import { useEffect, useState } from "react";
import { Plus } from "lucide-react"; // or wherever your Plus icon comes from
import CustomLineChart from "./CustomLineChart"; // adjust path as needed
import { prepareIncomeLineChartData } from "../utils/chartUtils"; // adjust path as needed

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);
    }, [transactions]);
    
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Income Overview    
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5"> {/* Fixed: removed space */}
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button className="add-btn inline-flex items-center gap-2" onClick={onAddIncome}>
                    <Plus size={15} className="text-lg" /> Add Income
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />    
            </div>
        </div>
    )
}

export default IncomeOverview;