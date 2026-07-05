import SectionTitle from "../ui/SectionTitle";

export default function PropertyDescription({ description }) {
    return (
        <div className="p-6 pb-0">
            <SectionTitle>Descripción</SectionTitle>

            <p className="text-[14.5px] leading-7 text-slate-600">
                {description}
            </p>
        </div>
    );
}