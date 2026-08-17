import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavorites, addFavorite, removeFavorite } from "../api/favoritesApi";
import useAuth from "../../auth/hooks/useAuth";

export default function useFavorites() {
    const { isAuthenticated } = useAuth();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
        enabled: isAuthenticated,
        staleTime: 1000 * 60,
    });

    const favorites = data ?? [];

    const favoriteIdByPropertyId = new Map(
        favorites.map((f) => [f.property.id, f.id])
    );

    const addMutation = useMutation({
        mutationFn: addFavorite,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["favorites"] }),
    });

    const removeMutation = useMutation({
        mutationFn: removeFavorite,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["favorites"] }),
    });

    function isFavorited(propertyId) {
        return favoriteIdByPropertyId.has(propertyId);
    }

    function toggleFavorite(propertyId) {
        const favoriteId = favoriteIdByPropertyId.get(propertyId);

        if (favoriteId) {
            removeMutation.mutate(favoriteId);
        } else {
            addMutation.mutate(propertyId);
        }
    }

    return {
        favorites,
        isLoading,
        isError,
        isFavorited,
        toggleFavorite,
        isMutating: addMutation.isPending || removeMutation.isPending,
    };
}