import { apiClient } from "../../../api/apiClient";


export async function getProperties(
    pageNum = 1,
    filters = {}
) {
    const params = new URLSearchParams();

    params.set(
        "page",
        String(pageNum)
    );

    Object.entries(filters).forEach(
        ([key, value]) => {
            const isFrontendOnlyFilter =
                key.endsWith("_preset");

            if (isFrontendOnlyFilter) {
                return;
            }

            if (
                value === "" ||
                value === null ||
                value === undefined
            ) {
                return;
            }

            params.set(
                key,
                String(value)
            );
        }
    );

    const response = await apiClient.get(
        `/properties/?${params.toString()}`
    );

    return response.data;
}


export async function getPropertyPredictions(
    propertyId
) {
    if (!propertyId) {
        throw new Error(
            "Se requiere el ID de la propiedad."
        );
    }

    const response = await apiClient.get(
        `/properties/${propertyId}/predictions/`
    );

    return response.data;
}


export async function getPropertyStats() {
    const response = await apiClient.get(
        "/properties/stats/"
    );

    return response.data;
}


export async function getPropertyFilterOptions() {
    const response = await apiClient.get(
        "/properties/filter-options/"
    );

    return response.data;
}