import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import Input from "./Input";

const WalletTransactionForm = ({ type, onSubmit }) => {
    const [amount, setAmount] = useState("");

    const isDeposit = type === 'deposit';

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(amount);
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-xl shadow-lg ${
                        isDeposit 
                            ? 'bg-gradient-to-br from-green-600 to-green-800' 
                            : 'bg-gradient-to-br from-red-600 to-red-800'
                    }`}>
                        {isDeposit ? (
                            <ArrowDown className="w-8 h-8 text-white" strokeWidth={2.5} />
                        ) : (
                            <ArrowUp className="w-8 h-8 text-white" strokeWidth={2.5} />
                        )}
                    </div>
                    <div>
                        <h6 className="text-white font-bold">
                            {isDeposit ? 'Deposit Money' : 'Withdraw Money'}
                        </h6>
                        <p className="text-gray-400 text-sm">
                            {isDeposit 
                                ? 'Add money to your wallet' 
                                : 'Remove money from your wallet'}
                        </p>
                    </div>
                </div>

                <Input
                    label="Amount (₱)"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <div className={`border rounded-xl p-4 mt-4 ${
                    isDeposit 
                        ? 'bg-green-600/10 border-green-600/30' 
                        : 'bg-red-600/10 border-red-600/30'
                }`}>
                    <p className="text-gray-400 text-xs font-medium mb-2">
                        {isDeposit ? '💰 Deposit Info:' : '⚠️ Withdrawal Info:'}
                    </p>
                    <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                        {isDeposit ? (
                            <>
                                <li>Amount must be greater than 0</li>
                                <li>Your wallet balance will be updated instantly</li>
                                <li>Transaction will be recorded in your history</li>
                            </>
                        ) : (
                            <>
                                <li>Ensure you have sufficient balance</li>
                                <li>Amount must not exceed your wallet balance</li>
                                <li>Transaction cannot be undone</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="submit"
                    className={`px-6 py-2.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-all ${
                        isDeposit
                            ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-600/40'
                            : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-red-600/40'
                    }`}
                >
                    {isDeposit ? 'Deposit' : 'Withdraw'}
                </button>
            </div>
        </form>
    );
};

export default WalletTransactionForm;