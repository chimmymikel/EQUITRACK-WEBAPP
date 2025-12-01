//export const BASE_URL = "https://equitrack-backend-kh8q.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "doxx8vaou";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes/all",
    GET_ALL_EXPENSES: "/expenses/all",
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes/all",
    ADD_EXPENSE: "expenses/all",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
    EMAIL_INCOME: "/email/income-excel",
    EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense", 
    EMAIL_EXPENSE: "/email/expense-excel",
    APPLY_FILTERS: "/filter",
    DASHBOARD_DATA: "/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}