//export const BASE_URL = "https://equitrack-backend-kh8q.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "doxx8vaou";

export const API_ENDPOINTS = {
    // Auth
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    
    // Categories
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    
    // Income
    GET_ALL_INCOMES: "/incomes/all",
    ADD_INCOME: "/incomes/all",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
    EMAIL_INCOME: "/email/income-excel",
    
    // Expense
    GET_ALL_EXPENSES: "/expenses/all",
    ADD_EXPENSE: "/expenses/all",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense", 
    EMAIL_EXPENSE: "/email/expense-excel",
    
    // Filters & Dashboard
    APPLY_FILTERS: "/filter",
    DASHBOARD_DATA: "/dashboard",
    
    // Wallets
    CREATE_WALLET: (profileId) => `/wallets/profile/${profileId}`,
    GET_WALLETS: (profileId) => `/wallets/profile/${profileId}`,
    GET_ACTIVE_WALLETS: (profileId) => `/wallets/profile/${profileId}/active`,
    GET_WALLET_BY_ID: (walletId) => `/wallets/${walletId}`,
    DEPOSIT_WALLET: (walletId) => `/wallets/${walletId}/deposit`,
    WITHDRAW_WALLET: (walletId) => `/wallets/${walletId}/withdraw`,
    TRANSFER_WALLET: "/wallets/transfer",
    GET_TOTAL_BALANCE: (profileId) => `/wallets/profile/${profileId}/total-balance`,
    UPDATE_WALLET: (walletId) => `/wallets/${walletId}`,
    DEACTIVATE_WALLET: (walletId) => `/wallets/${walletId}/deactivate`,
    DELETE_WALLET: (walletId) => `/wallets/${walletId}`,
    
    // NEW ENDPOINT FOR TRANSACTION HISTORY (WalletActivityController)
    GET_TRANSACTIONS: (profileId) => `/transactions/profile/${profileId}`, 
    
    // Budgets
    CREATE_BUDGET: (profileId) => `/budgets/profile/${profileId}`,
    GET_BUDGETS: (profileId) => `/budgets/profile/${profileId}`,
    GET_BUDGETS_BY_PERIOD: (profileId, period) => `/budgets/profile/${profileId}/period/${period}`,
    GET_BUDGET_BY_ID: (budgetId) => `/budgets/${budgetId}`,
    UPDATE_BUDGET: (budgetId) => `/budgets/${budgetId}`,
    DELETE_BUDGET: (budgetId) => `/budgets/${budgetId}`,
    
    // Upload
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}