// VITE_API_URL must be set in Render's frontend environment variables BEFORE building.
// Example: VITE_API_URL=https://your-backend-name.onrender.com/api
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    console.error(
        "[api.js] VITE_API_URL is not set. " +
        "Add it to Render's frontend environment variables and redeploy."
    );
}

export const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,

        headers: {
            "Content-Type": "application/json",

            ...(token && {
                Authorization: `Bearer ${token}`
            }),

            ...options.headers
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};