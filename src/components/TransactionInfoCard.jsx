import { Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from "lucide-react";
import { addThousandsSeparator } from "../util/util";

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {
    const normalizedType = type?.toLowerCase();

    const getAmountStyles = () =>
        normalizedType === 'income'
            ? 'bg-green-600/20 text-green-400 border border-green-600/30'
            : 'bg-red-600/20 text-red-400 border border-red-600/30';

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-700/40 transition-all border border-white/5 hover:border-white/10">
            <div className="w-12 h-12 flex items-center justify-center text-xl text-white bg-slate-700/50 rounded-full border border-white/10">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6" />
                ) : (
                    <UtensilsCrossed className="text-yellow-400" strokeWidth={2.5} />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-white font-semibold">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>

                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        >
                            <Trash2 size={18} strokeWidth={2.5} />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getAmountStyles()}`}>
                        <h6 className="text-xs font-bold">
                            {normalizedType === 'income' ? '+' : '-'} ₱{addThousandsSeparator(amount)}
                        </h6>
                        {normalizedType === 'income' ? (
                            <TrendingUp size={15} strokeWidth={2.5} />
                        ) : (
                            <TrendingDown size={15} strokeWidth={2.5} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;
