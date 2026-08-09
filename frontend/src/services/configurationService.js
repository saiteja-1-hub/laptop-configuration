import { apiRequest } from "./api";

export const getConfigurations = async () => {
    return apiRequest("/configurations");
};

export const getConfiguration = async (id) => {
    return apiRequest(`/configurations/${id}`);
};

export const createConfiguration = async (configurationData) => {
    return apiRequest("/configurations", {
        method: "POST",
        body: JSON.stringify(configurationData)
    });
};

export const deleteConfiguration = async (id) => {
    return apiRequest(`/configurations/${id}`, {
        method: "DELETE"
    });
};