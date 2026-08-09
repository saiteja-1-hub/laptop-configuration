import { apiRequest } from "./api";

export const getPriceHistory = async () => {
    return apiRequest("/history");
};

export const getComponentHistory = async (componentId) => {
    return apiRequest(`/history/component/${componentId}`);
};