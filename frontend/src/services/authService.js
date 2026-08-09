import { apiRequest } from "./api";

export const registerUser = async (userData) => {
    return apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const loginUser = async (userData) => {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};