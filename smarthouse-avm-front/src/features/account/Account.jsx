import useAuth from "../auth/hooks/useAuth";
import AccountHeader from "./components/header/AccountHeader";
import AccountInfoCard from "./components/info/AccountInfoCard";
import AccountStats from "./components/stats/AccountStats";
import AccountActions from "./components/actions/AccountActions";

export default function Account() {
    const { user } = useAuth();

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <AccountHeader />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <AccountInfoCard user={user} />
                </div>

                <div className="flex flex-col gap-4">
                    <AccountStats />
                    <AccountActions />
                </div>
            </div>
        </div>
    );
}