import { apiRequest } from "./api";

export const getComponents = async () => {
    return apiRequest("/components");
};

export const getComponent = async (id) => {
    return apiRequest(`/components/${id}`);
};

export const createComponent = async (componentData) => {
    return apiRequest("/components", {
        method: "POST",
        body: JSON.stringify(componentData)
    });
};

export const updateComponent = async (id, componentData) => {
    return apiRequest(`/components/${id}`, {
        method: "PUT",
        body: JSON.stringify(componentData)
    });
};

export const deleteComponent = async (id) => {
    return apiRequest(`/components/${id}`, {
        method: "DELETE"
    });
};