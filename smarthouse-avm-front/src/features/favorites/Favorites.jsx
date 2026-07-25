import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FavoritesHeader from "./components/header/FavoritesHeader";
import FavoriteCard from "./components/cards/FavoriteCard";
import FavoriteSkeleton from "./components/skeleton/FavoriteSkeleton";
import FavoritesEmptyState from "./components/empty-state/FavoritesEmptyState";
import CompareToast from "./components/compare-toast/CompareToast";
import { MOCK_FAVORITES } from "./lib/mockFavorites";

export default function Favorites() {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [comparing, setComparing] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const t = setTimeout(() => {
            setFavorites(MOCK_FAVORITES);
            setLoading(false);
        }, 900);
        return () => clearTimeout(t);
    }, []);

    function handleRemove(id) {
        setFavorites((prev) => prev.filter((p) => p.id !== id));
    }

    function handleCompareToggle(id) {
        setComparing((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    }

    const filtered = favorites.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <FavoritesHeader
                count={favorites.length}
                loading={loading}
                search={search}
                onSearchChange={setSearch}
            />

            <AnimatePresence>
                {comparing.length > 0 && (
                    <CompareToast count={comparing.length} onClear={() => setComparing([])} />
                )}
            </AnimatePresence>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <FavoriteSkeleton key={i} />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <FavoritesEmptyState />
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filtered.map((property) => (
                            <FavoriteCard
                                key={property.id}
                                property={property}
                                onRemove={handleRemove}
                                onCompareToggle={handleCompareToggle}
                                isComparing={comparing.includes(property.id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}