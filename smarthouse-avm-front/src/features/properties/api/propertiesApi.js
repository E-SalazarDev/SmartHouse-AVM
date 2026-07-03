import { apiClient } from "../../../api/apiClient";

export async function getProperties(pageNum) {
    const response = await apiClient.get(`/properties/?page=${pageNum}`);
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