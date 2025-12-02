import logo from './logo.png';
import login_bg from './login-background.png';
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet, WalletCards, Target } from 'lucide-react';

export const assets = {
    logo,
    login_bg,
}

export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Wallets",
        icon: WalletCards,
        path: "/wallets",
    },
    {
        id: "03",
        label: "Budgets",
        icon: Target,
        path: "/budgets",
    },
    {
        id: "04",
        label: "Category",
        icon: List,
        path: "/category",
    },
    {
        id: "05",
        label: "Income",
        icon: Wallet,
        path: "/income",
    },
    {
        id: "06",
        label: "Expense",
        icon: Coins,
        path: "/expense",
    },
    {
        id: "07",
        label: "Filters",
        icon: FunnelPlus,
        path: "/filter",
    }
];