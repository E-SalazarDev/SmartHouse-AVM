import { apiClient } from "../../../api/apiClient";

export async function getProperties() {
    const response = await apiClient.get("/properties/");
    return response.data;
}

// export async function getPropertyById(propertyId) {
//     const response = await apiClient.get(`/properties/${propertyId}/`);
//     return response.data;
// }

// export async function postPredictPropertyPrice(propertyId) {
//     const response = await apiClient.post(`/properties/${propertyId}/predict/`);
//     return response.data;
// }

export async function getPropertyPredictions(propertyId) {
    const response = await apiClient.get(`/properties/${propertyId}/predictions/`);
    return response.data;
}

export async function getPropertyStats() {
    const response = await apiClient.get("/properties/stats/");
    return response.data;
}