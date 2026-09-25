import LoginBlueprint from "../login/components/LoginBlueprint";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default function ForgotPassword() {
    return (
        <main className="grid min-h-screen w-full lg:grid-cols-2">
            <LoginBlueprint />
            <ForgotPasswordForm />
        </main>
    );
}