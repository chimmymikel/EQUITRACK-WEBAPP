export const BASE_URL = "https://equitrack-backend-kh8q.onrender.com/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "doxx8vaou";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}