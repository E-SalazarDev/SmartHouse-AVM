import img from "../../assets/house.jpg";
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";

export default function Home() {
    return (
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 md:p-6 shadow-xl flex flex-col gap-4">
            <PageTitle title="Home" />

            <Grid className="grid-cols-1 md:grid-cols-3 items-stretch">
                <div className="md:col-span-2 grid grid-rows-2 gap-4">
                    <Card className="min-h-36">cards</Card>
                    <Card className="min-h-36">contenido</Card>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-800 overflow-hidden">
                    <img
                        src={img}
                        alt="House"
                        className="h-full min-h-72 w-full object-cover"
                    />
                </div>
            </Grid>

            <Grid className="grid-cols-1">
                <Card className="min-h-20">fila 1</Card>
                <Card className="min-h-20">fila 2</Card>
                <Card className="min-h-20">fila 3</Card>
            </Grid>
        </div>
    );
}