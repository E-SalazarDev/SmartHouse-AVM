import { useEffect, useState } from "react";

import Grid from "../../components/ui/Grid";
import PageTitle from "../../components/ui/PageTitle";
import PropertyCard from "./components/PropertyCard";
import { getProperties } from "./api/propertiesApi";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProperties() {
            try {
                const data = await getProperties();
                setProperties(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        loadProperties();
    }, []);

    if (loading) {
        return <p>Cargando propiedades...</p>;
    }

    if (error) {
        return <p>Error al cargar propiedades.</p>;
    }

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <PageTitle
                variant="default"
                size="md"
                title="Propiedades registradas"
            />

            <Grid className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch gap-10">
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </Grid>
        </div>
    );
}