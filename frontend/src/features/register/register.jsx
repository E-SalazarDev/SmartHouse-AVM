import RegisterBlueprint from "./components/RegisterBlueprint";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-2">
            <RegisterBlueprint />
            <RegisterForm />
        </div>
    );
}