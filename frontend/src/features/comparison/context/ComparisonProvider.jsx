import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ComparisonContext = createContext(null);

const STORAGE_KEY = "smarthouse-comparison-ids";
const MAX_COMPARISON_ITEMS = 3;

function readStoredIds() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function ComparisonProvider({ children }) {
    const [selectedIds, setSelectedIds] = useState(readStoredIds);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
    }, [selectedIds]);

    const toggleComparison = useCallback((propertyId) => {
        setSelectedIds((previousIds) => {
            if (previousIds.includes(propertyId)) {
                return previousIds.filter((id) => id !== propertyId);
            }
            if (previousIds.length >= MAX_COMPARISON_ITEMS) {
                return previousIds;
            }
            return [...previousIds, propertyId];
        });
    }, []);

    const removeFromComparison = useCallback((propertyId) => {
        setSelectedIds((previousIds) =>
            previousIds.filter((id) => id !== propertyId)
        );
    }, []);

    const clearComparison = useCallback(() => {
        setSelectedIds([]);
    }, []);

    const isSelected = useCallback(
        (propertyId) => selectedIds.includes(propertyId),
        [selectedIds]
    );

    const value = {
        selectedIds,
        toggleComparison,
        removeFromComparison,
        clearComparison,
        isSelected,
        isFull: selectedIds.length >= MAX_COMPARISON_ITEMS,
        maxItems: MAX_COMPARISON_ITEMS,
    };

    return (
        <ComparisonContext.Provider value={value}>
            {children}
        </ComparisonContext.Provider>
    );
}

export function useComparison() {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error("useComparison debe usarse dentro de un ComparisonProvider");
    }
    return context;
}