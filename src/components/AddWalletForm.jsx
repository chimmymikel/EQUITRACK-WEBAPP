import { useState } from "react";
import { Wallet } from "lucide-react";
import Input from "./Input";

const AddWalletForm = ({ onSubmit }) => {
    const [walletType, setWalletType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ walletType });
        setWalletType("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-lg">
                        <Wallet className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h6 className="text-white font-bold">Create New Wallet</h6>
                        <p className="text-gray-400 text-sm">Enter a name for your wallet</p>
                    </div>
                </div>

                <Input
                    label="Wallet Name"
                    type="text"
                    placeholder="e.g., Cash, Bank Account, Savings"
                    value={walletType}
                    onChange={(e) => setWalletType(e.target.value)}
                />

                <div className="bg-slate-800/30 border border-white/10 rounded-xl p-4 mt-4">
                    <p className="text-gray-400 text-xs font-medium mb-2">💡 Tips:</p>
                    <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                        <li>Use descriptive names like "Cash Wallet" or "Savings Account"</li>
                        <li>Create separate wallets for different purposes</li>
                        <li>You can deposit or withdraw money anytime</li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all"
                >
                    Create Wallet
                </button>
            </div>
        </form>
    );
};

export default AddWalletForm;