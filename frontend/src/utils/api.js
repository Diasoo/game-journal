import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = "http://localhost:8000/api";

export function useApi() {
    const { getToken } = useAuth();

    async function apiFetch(endpoint, options = {}) {
        const token = await getToken();

        if (!token) {
            throw new Error("No Clerk token found.");
        }

        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error?.detail || `API error ${res.status}`);
        }

        return res.json();
    }

    const api = {
        get: (url) => apiFetch(url),
        post: (url, body) =>
            apiFetch(url, {
                method: "POST",
                body: JSON.stringify(body),
            }),
        put: (url, body) =>
            apiFetch(url, {
                method: "PUT",
                body: JSON.stringify(body),
            }),
        delete: (url) =>
            apiFetch(url, {
                method: "DELETE",
            }),
    };

    return api;
}
