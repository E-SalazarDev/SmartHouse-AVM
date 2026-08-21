import { useQuery } from "@tanstack/react-query";
import { getProperties, getPropertyStats } from "../../properties/api/propertiesApi";

async function fetchAllProperties() {
    const firstPage = await getProperties(1, {});
    const totalPages = firstPage.total_pages ?? 1;

    if (totalPages <= 1) {
        return firstPage.results;
    }

    const remainingPageNumbers = Array.from(
        { length: totalPages - 1 },
        (_, index) => index + 2
    );

    const remainingPages = await Promise.all(
        remainingPageNumbers.map((page) => getProperties(page, {}))
    );

    return [
        ...firstPage.results,
        ...remainingPages.flatMap((page) => page.results),
    ];
}

export default function usePropertyTrends() {
    const propertiesQuery = useQuery({
        queryKey: ["properties", "all-for-trends"],
        queryFn: fetchAllProperties,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });

    const statsQuery = useQuery({
        queryKey: ["property-stats"],
        queryFn: getPropertyStats,
        staleTime: 1000 * 60 * 10,
    });

    return {
        properties: propertiesQuery.data ?? [],
        stats: statsQuery.data,
        isLoading: propertiesQuery.isLoading || statsQuery.isLoading,
        isError: propertiesQuery.isError || statsQuery.isError,
    };
}