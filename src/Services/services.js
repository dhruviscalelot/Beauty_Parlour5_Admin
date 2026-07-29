import axios from "axios";
import toast from "react-hot-toast";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 axios instance with base URL
const api = axios.create({
    baseURL: API_BASE_URL
});

// 🔹 Attach token automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Set Content-Type only if not FormData
        if (!(config.data instanceof FormData)) {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



api.interceptors.response.use(
    (response) => {
        // Skip toast logic for blob responses (file downloads/exports)
        // Blob responses don't have JSON structure with IsSuccess/success properties
        const isBlobResponse = response?.config?.responseType === 'blob' || response?.data instanceof Blob;

        if (!isBlobResponse) {
            if (response?.data?.IsSuccess || response?.data?.isSuccess || response?.data?.success) {
                // toast.success(response?.data?.Message);
            } else {
                toast.error(response?.data?.Message || "Something went wrong!");
            }
        }
        return response;
    },
    (error) => {
        // if (error?.response?.status === 401) {
        //   localStorage.clear();
        //   window.location.href = "/";
        // }

        // Skip toast for blob responses (file download errors should be handled by component)
        const isBlobRequest = error?.config?.responseType === 'blob';

        if (!isBlobRequest) {
            const errorMessage = error?.response?.data?.Message || error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === "string") {
                toast.error(errorMessage);
            }
            else {
                toast.error("Something went wrong!");
            }
        }

        console.error("Axios Error:", error);

        return Promise.reject(error);
    }
);


// Auth APIs
export const login = (data) => api.post("admin/auth/login",data);
