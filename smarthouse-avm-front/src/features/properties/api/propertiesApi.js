import { apiClient } from "../../../api/apiClient";

export async function getProperties(pageNum, filters = {}) {
    const params = new URLSearchParams();

    params.append("page", pageNum);

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
            params.append(key, value);
        }
    });

    const response = await apiClient.get(`/properties/?${params.toString()}`);

    return response.data;
}


export async function getPropertyPredictions(propertyId) {
    const response = await apiClient.get(`/properties/${propertyId}/predictions/`);
    return response.data;
}

export async function getPropertyStats() {
    const response = await apiClient.get("/properties/stats/");
    return response.data;
}