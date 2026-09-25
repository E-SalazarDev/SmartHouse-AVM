import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Bath,
    BedDouble,
    Building2,
    CalendarDays,
    CarFront,
    ChevronDown,
    MapPin,
    Ruler,
    Search,
    Sparkles,
    RotateCcw,
    X,
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
    RL: "Baja densidad",
    RM: "Media densidad",
    RH: "Alta densidad",
    FV: "Planificada",
    "C (all)": "Comercial",
};


export default function PropertyExploreHeader({
    totalProperties = 0,
    filters = emptyFilters,
    filterOptions = {},
    onFilterChange = () => {},
    onMultipleFilterChanges = () => {},
    onClearFilters = () => {},
    title = "Explora propiedades",
    subtitle = "Encuentra viviendas por ubicación, calidad y superficie",
    icon: HeaderIcon = Building2,
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

   
    const activeAdvancedCount = useMemo(
        () =>
            [
                filters.year_preset,
                filters.min_bedrooms,
                filters.min_full_bath,
                filters.garage_cars,
            ].filter((value) => value !== "" && value != null)
                .length,
        [
            filters.year_preset,
            filters.min_bedrooms,
            filters.min_full_bath,
            filters.garage_cars,
        ]
    );

    const [isAdvancedOpen, setIsAdvancedOpen] = useState(
        () => activeAdvancedCount > 0
    );


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

            setIsAdvancedOpen(true);

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

    const isFieldActive = (value) =>
        value !== "" && value != null;


    return (
        <Card className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-0 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl">
           
            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 md:px-6 lg:flex-row lg:items-center">
                <div className="flex shrink-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-600 shadow-md shadow-violet-600/20">
                        <HeaderIcon className="h-4.5 w-4.5 text-white" />
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <PageTitle
                                variant="default"
                                size="md"
                                title={title}
                            />

                            <span className="rounded-full border border-violet-100 bg-violet-50 px-2.5 py-0.5 text-xs font-bold text-violet-700">
                                {totalProperties}
                            </span>
                        </div>

                        <p className="text-xs text-slate-400">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className="relative flex-1 lg:mx-2">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleInputChange}
                        placeholder="Buscar por título, barrio o zona..."
                        className={[
                            "w-full rounded-full border bg-white py-3 pl-11 text-sm text-slate-700",
                            "outline-none transition placeholder:text-slate-400",
                            filters.search ? "pr-10" : "pr-4",
                            isFieldActive(filters.search)
                                ? "border-violet-300 bg-violet-50/40 focus:ring-4 focus:ring-violet-100"
                                : "border-slate-200 focus:border-violet-300 focus:ring-4 focus:ring-violet-50",
                        ].join(" ")}
                    />

                    {filters.search && (
                        <button
                            type="button"
                            onClick={() =>
                                onFilterChange("search", "")
                            }
                            aria-label="Limpiar búsqueda"
                            className="absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Limpiar
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setIsAdvancedOpen((open) => !open)
                        }
                        aria-expanded={isAdvancedOpen}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-600/25 transition hover:shadow-lg hover:shadow-violet-600/30"
                    >
                        Más filtros
                        {activeAdvancedCount > 0 && (
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-[10px] font-bold">
                                {activeAdvancedCount}
                            </span>
                        )}
                        <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                isAdvancedOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                </div>
            </div>

            <div className="p-5 md:p-6">
            
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <FilterSelect
                        label="Barrio"
                        icon={MapPin}
                        name="neighborhood"
                        value={filters.neighborhood}
                        onChange={handleInputChange}
                        active={isFieldActive(
                            filters.neighborhood
                        )}
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
                        active={isFieldActive(
                            filters.ms_zoning
                        )}
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
                        active={isFieldActive(
                            filters.quality_preset
                        )}
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
                                    {preset.label} · {preset.count}
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
                        active={isFieldActive(
                            filters.area_preset
                        )}
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
                                    {preset.label} · {preset.count}
                                </option>
                            )
                        )}

                        <option value="custom">
                            Rango personalizado
                        </option>
                    </FilterSelect>
                </div>

                <AnimatePresence initial={false}>
                    {filters.area_preset === "custom" && (
                        <motion.div
                            key="custom-area-range"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                            }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl border border-violet-100 bg-violet-50/30 p-4 sm:grid-cols-2">
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
                                    min={areaConstraints.min}
                                    max={areaConstraints.max}
                                    suffix="m²"
                                    hasError={
                                        hasInvalidAreaRange
                                    }
                                    active={isFieldActive(
                                        filters.min_area
                                    )}
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
                                    min={areaConstraints.min}
                                    max={areaConstraints.max}
                                    suffix="m²"
                                    hasError={
                                        hasInvalidAreaRange
                                    }
                                    active={isFieldActive(
                                        filters.max_area
                                    )}
                                />

                                {hasInvalidAreaRange && (
                                    <p className="sm:col-span-2 text-xs font-semibold text-red-600">
                                        El área máxima no puede
                                        ser menor que el área
                                        mínima.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

 
                <AnimatePresence initial={false}>
                    {isAdvancedOpen && (
                        <motion.div
                            key="advanced-filters"
                            initial={{
                                height: 0,
                                opacity: 0,
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.22,
                                ease: "easeInOut",
                            }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-dashed border-slate-200 pt-4 xl:grid-cols-4">
                                <FilterSelect
                                    label="Año de construcción"
                                    icon={CalendarDays}
                                    name="year_preset"
                                    value={filters.year_preset}
                                    onChange={
                                        handleYearPresetChange
                                    }
                                    active={isFieldActive(
                                        filters.year_preset
                                    )}
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
                                                {preset.label} · {preset.count}
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
                                    active={isFieldActive(
                                        filters.min_bedrooms
                                    )}
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
                                    active={isFieldActive(
                                        filters.min_full_bath
                                    )}
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
                                    active={isFieldActive(
                                        filters.garage_cars
                                    )}
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

                                {filters.year_preset ===
                                    "custom" && (
                                    <div className="col-span-2 grid grid-cols-2 gap-4 rounded-2xl border border-violet-100 bg-violet-50/30 p-4 xl:col-span-4 xl:grid-cols-4">
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
                                            active={isFieldActive(
                                                filters.year_built_min
                                            )}
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
                                            active={isFieldActive(
                                                filters.year_built_max
                                            )}
                                        />

                                        {hasInvalidYearRange && (
                                            <p className="col-span-2 text-xs font-semibold text-red-600 xl:col-span-4">
                                                El año máximo no
                                                puede ser menor que
                                                el año mínimo.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {(areaConstraints.min != null ||
                    yearConstraints.min != null) && (
                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                        {areaConstraints.min != null &&
                            areaConstraints.max != null && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-500">
                                    <Ruler className="h-3 w-3 text-slate-400" />
                                    Superficie:{" "}
                                    <span className="font-mono font-semibold text-slate-700">
                                        {areaConstraints.min}–
                                        {areaConstraints.max} m²
                                    </span>
                                </span>
                            )}

                        {yearConstraints.min != null &&
                            yearConstraints.max != null && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-500">
                                    <CalendarDays className="h-3 w-3 text-slate-400" />
                                    Años:{" "}
                                    <span className="font-mono font-semibold text-slate-700">
                                        {yearConstraints.min}–
                                        {yearConstraints.max}
                                    </span>
                                </span>
                            )}
                    </div>
                )}
            </div>
        </Card>
    );
}


function FilterLabel({
    label,
    icon: Icon,
    active = false,
}) {
    return (
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-600">
            {Icon && (
                <Icon className="h-3.5 w-3.5 text-slate-400" />
            )}

            {label}

            {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            )}
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
    active = false,
    className = "",
}) {
    return (
        <div className={className}>
            <FilterLabel
                label={label}
                icon={icon}
                active={active}
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
                        "w-full rounded-xl border bg-white",
                        "px-4 py-2.5 text-sm text-slate-700",
                        "outline-none transition",
                        "placeholder:text-slate-400",
                        suffix ? "pr-12" : "",
                        hasError
                            ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                            : active
                              ? "border-violet-300 bg-violet-50/40 focus:ring-4 focus:ring-violet-100"
                              : "border-slate-200 focus:border-violet-300 focus:ring-4 focus:ring-violet-50",
                    ].join(" ")}
                />

                {suffix && (
                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
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
    active = false,
    className = "",
}) {
    return (
        <div className={className}>
            <FilterLabel
                label={label}
                icon={icon}
                active={active}
            />

            <select
                name={name}
                value={value}
                onChange={onChange}
                className={[
                    "w-full truncate rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition",
                    active
                        ? "border-violet-300 bg-violet-50/40 text-slate-800 font-semibold focus:ring-4 focus:ring-violet-100"
                        : "border-slate-200 text-slate-700 focus:border-violet-300 focus:ring-4 focus:ring-violet-50",
                ].join(" ")}
            >
                {children}
            </select>
        </div>
    );
}