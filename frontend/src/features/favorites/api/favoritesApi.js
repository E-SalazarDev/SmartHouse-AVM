import { apiClient } from "../../../api/apiClient";

export async function getFavorites() {
    const response = await apiClient.get("/favorites/");
    return response.data;
}

export async function addFavorite(propertyId) {
    const response = await apiClient.post("/favorites/", {
        property_id: propertyId,
    });
    return response.data;
}

export async function removeFavorite(favoriteId) {
    await apiClient.delete(`/favorites/${favoriteId}/`);
}