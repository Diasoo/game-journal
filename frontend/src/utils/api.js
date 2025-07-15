import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export function useApi() {
    const { getToken } = useAuth();

    const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    api.interceptors.request.use(async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return api;
}