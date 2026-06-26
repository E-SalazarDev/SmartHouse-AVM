import { apiClient } from "../../../api/apiClient";

export async function getPropertiesById(propertyId) {
    const response = await apiClient.get(`/properties/${propertyId}`)
    return response.data
}

export async function postPredictPropertyPrice(propertyId) {
    const response = await apiClient.post(`/properties/${propertyId}/predict/`)
    return response.data
}