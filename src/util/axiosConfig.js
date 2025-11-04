import axios from "axios";
import { BASE_URL } from "./apiEndpoints";


const axiosConfig = axios.create({
    baseURL: BASE_URL,
    timeout: 60000, // 60 seconds to account for cold starts
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//list of endpoints that do not require auth orization header
const exludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

//request interceptor 
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipTheToken = exludeEndpoints.some((endpoint) => {
        return config.url?.includes(endpoint);
    });

    if(!shouldSkipTheToken){
        const accessToken = localStorage.getItem("token");

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }

    return config;
},(error) => {
    return Promise.reject(error);
});

//response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response){
        if(error.response.status === 401){
            localStorage.removeItem("token");
            window.location.href = "/login";
        }else if(error.response.status === 500){
            console.error("Server error occurred. Please try again later.");
        }
    }else if(error.code === "ECONNABORTED" || error.message === "Network Error"){
        console.error("Network error occurred. Please check your internet connection.");
    }
    return Promise.reject(error);
});

export default axiosConfig;