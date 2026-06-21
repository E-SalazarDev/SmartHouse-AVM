import Grid from "../../components/ui/Grid";
import AiValuationCard from "../../components/ui/AiValuationCard";

import HomeHero from "./components/HomeHero";
import HomeWorkspace from "./components/HomeWorkspace";
import HomeModelSummary from "./components/HomeModelSummary";
import HomeExploreHeader from "./components/HomeExploreHeader";
import HomePropertyPreview from "./components/HomePropertyPreview";

export default function Home() {
    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <HomeHero />

            <Grid className="grid-cols-1 md:grid-cols-3 items-stretch gap-5">
                <div className="md:col-span-2 flex flex-col gap-5">
                    <HomeWorkspace />
                    <HomeModelSummary />
                </div>

                <AiValuationCard />
            </Grid>

            <HomeExploreHeader />

            <HomePropertyPreview />
        </div>
    );
}