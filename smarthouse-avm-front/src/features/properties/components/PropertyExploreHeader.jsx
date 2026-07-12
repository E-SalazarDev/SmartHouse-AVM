import {
    Bath,
    BedDouble,
    Building2,
    CalendarDays,
    CarFront,
    MapPin,
    Ruler,
    Search,
    SlidersHorizontal,
    Sparkles,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import PageTitle from "../../../components/ui/PageTitle";


const emptyFilters = {
    search: "",
    neighborhood: "",
    ms_zoning: "",

    quality_preset: "",
    min_quality: "",
    max_quality: "",

    area_preset: "",
    min_area: "",
    max_area: "",

    year_preset: "",
    year_built_min: "",
    year_built_max: "",

    garage_cars: "",
    min_garage_cars: "",
    min_bedrooms: "",
    min_full_bath: "",
};


const zoningLabels = {
    RL: "Residencial baja densidad",
    RM: "Residencial media densidad",
    RH: "Residencial alta densidad",
    FV: "Residencial planificada",
    "C (all)": "Comercial",
};


export default function PropertyExploreHeader({
    totalProperties = 0,
    filters = emptyFilters,
    filterOptions = {},
    onFilterChange = () => {},
    onMultipleFilterChanges = () => {},
    onClearFilters = () => {},
}) {
    const categoricalOptions =
        filterOptions?.categorical_options ?? {};

    const constraints =
        filterOptions?.constraints ?? {};

    const presets =
        filterOptions?.presets ?? {};

    const neighborhoods =
        categoricalOptions.neighborhoods ?? [];

    const msZonings =
        categoricalOptions.ms_zonings ?? [];

    const garageCars =
        categoricalOptions.garage_cars ?? [];

    const bedrooms =
        categoricalOptions.bedrooms ?? [];

    const fullBaths =
        categoricalOptions.full_baths ?? [];

    const qualityPresets =
        presets.quality ?? [];

    const areaPresets =
        presets.area ?? [];

    const yearPresets =
        presets.year_built ?? [];

    const areaConstraints =
        constraints.area ?? {};

    const yearConstraints =
        constraints.year_built ?? {};


    function handleInputChange(event) {
        const { name, value } = event.target;

        onFilterChange(name, value);
    }


    function handleQualityPresetChange(event) {
        const selectedValue =
            event.target.value;

        const selectedPreset =
            qualityPresets.find(
                (preset) =>
                    preset.value ===
                    selectedValue
            );

        onMultipleFilterChanges({
            quality_preset: selectedValue,
            min_quality:
                selectedPreset
                    ?.min_quality ?? "",
            max_quality:
                selectedPreset
                    ?.max_quality ?? "",
        });
    }


    function handleAreaPresetChange(event) {
        const selectedValue =
            event.target.value;

        if (selectedValue === "custom") {
            onMultipleFilterChanges({
                area_preset: "custom",
                min_area: "",
                max_area: "",
            });

            return;
        }

        const selectedPreset =
            areaPresets.find(
                (preset) =>
                    preset.value ===
                    selectedValue
            );

        onMultipleFilterChanges({
            area_preset: selectedValue,
            min_area:
                selectedPreset?.min_area ??
                "",
            max_area:
                selectedPreset?.max_area ??
                "",
        });
    }


    function handleYearPresetChange(event) {
        const selectedValue =
            event.target.value;

        if (selectedValue === "custom") {
            onMultipleFilterChanges({
                year_preset: "custom",
                year_built_min: "",
                year_built_max: "",
            });

            return;
        }

        const selectedPreset =
            yearPresets.find(
                (preset) =>
                    preset.value ===
                    selectedValue
            );

        onMultipleFilterChanges({
            year_preset: selectedValue,
            year_built_min:
                selectedPreset
                    ?.year_built_min ?? "",
            year_built_max:
                selectedPreset
                    ?.year_built_max ?? "",
        });
    }


    const hasInvalidAreaRange =
        filters.min_area !== "" &&
        filters.max_area !== "" &&
        Number(filters.min_area) >
            Number(filters.max_area);

    const hasInvalidYearRange =
        filters.year_built_min !== "" &&
        filters.year_built_max !== "" &&
        Number(filters.year_built_min) >
            Number(filters.year_built_max);


    return (
        <Card className="overflow-hidden rounded-4xl border border-white/80 bg-white/90 p-0 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="border-b border-slate-100 px-5 py-5 md:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 shadow-lg shadow-slate-900/10 sm:flex">
                            <Building2 className="h-5 w-5 text-white" />
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <PageTitle
                                    variant="default"
                                    size="md"
                                    title="Explora propiedades"
                                />

                                <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                                    {totalProperties} propiedades
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                Filtra las viviendas según ubicación,
                                características, calidad, superficie
                                y año de construcción.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Limpiar filtros
                    </button>
                </div>
            </div>

            <div className="p-5 md:p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
                    <div className="xl:col-span-4">
                        <FilterLabel
                            label="Buscar"
                            icon={Search}
                        />

                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleInputChange}
                                placeholder="Título, barrio o zona..."
                                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>
                    </div>

                    <FilterSelect
                        label="Barrio"
                        icon={MapPin}
                        name="neighborhood"
                        value={filters.neighborhood}
                        onChange={handleInputChange}
                        className="xl:col-span-2"
                    >
                        <option value="">
                            Cualquier barrio
                        </option>

                        {neighborhoods.map(
                            (neighborhood) => (
                                <option
                                    key={neighborhood}
                                    value={neighborhood}
                                >
                                    {neighborhood}
                                </option>
                            )
                        )}
                    </FilterSelect>

                    <FilterSelect
                        label="Zona"
                        icon={Building2}
                        name="ms_zoning"
                        value={filters.ms_zoning}
                        onChange={handleInputChange}
                        className="xl:col-span-2"
                    >
                        <option value="">
                            Cualquier zona
                        </option>

                        {msZonings.map(
                            (zoning) => (
                                <option
                                    key={zoning}
                                    value={zoning}
                                >
                                    {zoningLabels[zoning] ??
                                        zoning}
                                </option>
                            )
                        )}
                    </FilterSelect>

                    <FilterSelect
                        label="Calidad"
                        icon={Sparkles}
                        name="quality_preset"
                        value={filters.quality_preset}
                        onChange={
                            handleQualityPresetChange
                        }
                        className="xl:col-span-2"
                    >
                        <option value="">
                            Cualquier calidad
                        </option>

                        {qualityPresets.map(
                            (preset) => (
                                <option
                                    key={preset.value}
                                    value={preset.value}
                                >
                                    {preset.label} ({preset.count})
                                </option>
                            )
                        )}
                    </FilterSelect>

                    <FilterSelect
                        label="Superficie"
                        icon={Ruler}
                        name="area_preset"
                        value={filters.area_preset}
                        onChange={
                            handleAreaPresetChange
                        }
                        className="xl:col-span-2"
                    >
                        <option value="">
                            Cualquier superficie
                        </option>

                        {areaPresets.map(
                            (preset) => (
                                <option
                                    key={preset.value}
                                    value={preset.value}
                                >
                                    {preset.label} ({preset.count})
                                </option>
                            )
                        )}

                        <option value="custom">
                            Rango personalizado
                        </option>
                    </FilterSelect>

                    <FilterSelect
                        label="Año de construcción"
                        icon={CalendarDays}
                        name="year_preset"
                        value={filters.year_preset}
                        onChange={
                            handleYearPresetChange
                        }
                        className="xl:col-span-2"
                    >
                        <option value="">
                            Cualquier año
                        </option>

                        {yearPresets.map(
                            (preset) => (
                                <option
                                    key={preset.value}
                                    value={preset.value}
                                >
                                    {preset.label} ({preset.count})
                                </option>
                            )
                        )}

                        <option value="custom">
                            Periodo personalizado
                        </option>
                    </FilterSelect>

                    <FilterSelect
                        label="Habitaciones mínimas"
                        icon={BedDouble}
                        name="min_bedrooms"
                        value={filters.min_bedrooms}
                        onChange={handleInputChange}
                        className="xl:col-span-2"
                    >
                        <option value="">
                            Cualquier cantidad
                        </option>

                        {bedrooms.map(
                            (bedroom) => (
                                <option
                                    key={bedroom}
                                    value={bedroom}
                                >
                                    {bedroom} o más
                                </option>
                            )
                        )}
                    </FilterSelect>

                    <FilterSelect
                        label="Baños mínimos"
                        icon={Bath}
                        name="min_full_bath"
                        value={filters.min_full_bath}
                        onChange={handleInputChange}
                        className="xl:col-span-2"
                    >
                        <option value="">
                            Cualquier cantidad
                        </option>

                        {fullBaths.map(
                            (bathroom) => (
                                <option
                                    key={bathroom}
                                    value={bathroom}
                                >
                                    {bathroom} o más
                                </option>
                            )
                        )}
                    </FilterSelect>

                    <FilterSelect
                        label="Garaje"
                        icon={CarFront}
                        name="garage_cars"
                        value={filters.garage_cars}
                        onChange={handleInputChange}
                        className="xl:col-span-2"
                    >
                        <option value="">
                            Cualquier capacidad
                        </option>

                        {garageCars.map(
                            (garage) => (
                                <option
                                    key={garage}
                                    value={garage}
                                >
                                    {garage === 0
                                        ? "Sin garaje"
                                        : garage === 1
                                          ? "1 auto"
                                          : `${garage} autos`}
                                </option>
                            )
                        )}
                    </FilterSelect>

                    {filters.area_preset ===
                        "custom" && (
                        <>
                            <FilterInput
                                label="Área mínima"
                                icon={Ruler}
                                name="min_area"
                                value={filters.min_area}
                                onChange={
                                    handleInputChange
                                }
                                placeholder={
                                    areaConstraints.min !=
                                    null
                                        ? `Desde ${areaConstraints.min}`
                                        : "Ej. 80"
                                }
                                min={
                                    areaConstraints.min
                                }
                                max={
                                    areaConstraints.max
                                }
                                suffix="m²"
                                hasError={
                                    hasInvalidAreaRange
                                }
                                className="xl:col-span-2"
                            />

                            <FilterInput
                                label="Área máxima"
                                icon={Ruler}
                                name="max_area"
                                value={filters.max_area}
                                onChange={
                                    handleInputChange
                                }
                                placeholder={
                                    areaConstraints.max !=
                                    null
                                        ? `Hasta ${areaConstraints.max}`
                                        : "Ej. 180"
                                }
                                min={
                                    areaConstraints.min
                                }
                                max={
                                    areaConstraints.max
                                }
                                suffix="m²"
                                hasError={
                                    hasInvalidAreaRange
                                }
                                className="xl:col-span-2"
                            />
                        </>
                    )}

                    {filters.year_preset ===
                        "custom" && (
                        <>
                            <FilterInput
                                label="Construida desde"
                                icon={CalendarDays}
                                name="year_built_min"
                                value={
                                    filters.year_built_min
                                }
                                onChange={
                                    handleInputChange
                                }
                                placeholder={
                                    yearConstraints.min !=
                                    null
                                        ? `Desde ${yearConstraints.min}`
                                        : "Ej. 1980"
                                }
                                min={
                                    yearConstraints.min
                                }
                                max={
                                    yearConstraints.max
                                }
                                hasError={
                                    hasInvalidYearRange
                                }
                                className="xl:col-span-2"
                            />

                            <FilterInput
                                label="Construida hasta"
                                icon={CalendarDays}
                                name="year_built_max"
                                value={
                                    filters.year_built_max
                                }
                                onChange={
                                    handleInputChange
                                }
                                placeholder={
                                    yearConstraints.max !=
                                    null
                                        ? `Hasta ${yearConstraints.max}`
                                        : "Ej. 2007"
                                }
                                min={
                                    yearConstraints.min
                                }
                                max={
                                    yearConstraints.max
                                }
                                hasError={
                                    hasInvalidYearRange
                                }
                                className="xl:col-span-2"
                            />
                        </>
                    )}
                </div>

                {(hasInvalidAreaRange ||
                    hasInvalidYearRange) && (
                    <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                        {hasInvalidAreaRange && (
                            <p className="text-xs font-semibold text-red-600">
                                El área máxima no puede ser menor
                                que el área mínima.
                            </p>
                        )}

                        {hasInvalidYearRange && (
                            <p className="text-xs font-semibold text-red-600">
                                El año máximo no puede ser menor
                                que el año mínimo.
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    {areaConstraints.min != null &&
                        areaConstraints.max != null && (
                            <span>
                                Superficie disponible:{" "}
                                <strong className="font-semibold text-slate-700">
                                    {areaConstraints.min}–
                                    {areaConstraints.max} m²
                                </strong>
                            </span>
                        )}

                    {yearConstraints.min != null &&
                        yearConstraints.max != null && (
                            <span>
                                Años disponibles:{" "}
                                <strong className="font-semibold text-slate-700">
                                    {yearConstraints.min}–
                                    {yearConstraints.max}
                                </strong>
                            </span>
                        )}
                </div>
            </div>
        </Card>
    );
}


function FilterLabel({
    label,
    icon: Icon,
}) {
    return (
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-600">
            {Icon && (
                <Icon className="h-3.5 w-3.5 text-slate-400" />
            )}

            {label}
        </label>
    );
}


function FilterInput({
    label,
    icon,
    name,
    value,
    onChange,
    placeholder,
    min,
    max,
    suffix,
    hasError = false,
    className = "",
}) {
    return (
        <div className={className}>
            <FilterLabel
                label={label}
                icon={icon}
            />

            <div className="relative">
                <input
                    type="number"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    className={[
                        "w-full rounded-2xl border bg-white",
                        "px-4 py-3 text-sm text-slate-700",
                        "outline-none transition",
                        "placeholder:text-slate-400",
                        suffix ? "pr-16" : "",
                        hasError
                            ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                            : "border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50",
                    ].join(" ")}
                />

                {suffix && (
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
}


function FilterSelect({
    label,
    icon,
    name,
    value,
    onChange,
    children,
    className = "",
}) {
    return (
        <div className={className}>
            <FilterLabel
                label={label}
                icon={icon}
            />

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
            >
                {children}
            </select>
        </div>
    );
}