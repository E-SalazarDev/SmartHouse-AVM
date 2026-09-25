import img from "../../../assets/house.png";
import Card from "../../../components/ui/Card";
import Grid from "../../../components/ui/Grid";

export default function HomePropertyPreview() {
    return (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            <Card
                padded={false}
                className="overflow-hidden border border-slate-600 rounded-4xl relative"
            >
                <div className="h-56 sm:h-64 md:h-72 overflow-hidden">
                    <img
                        src={img}
                        alt="Casa"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="p-4 flex items-center justify-between gap-4">
                    <div>
                        <h3 className="font-semibold text-lg">
                            Casa Moderna
                        </h3>

                        <p className="text-slate-500 text-sm">
                            Vista previa de la propiedad
                        </p>
                    </div>

                    <button className="shrink-0 w-10 h-10 rounded-full bg-brand-blue hover:opacity-90 transition text-white">
                        →
                    </button>

                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                        Calidad 7/10
                    </span>
                </div>
            </Card>
        </Grid>
    );
}