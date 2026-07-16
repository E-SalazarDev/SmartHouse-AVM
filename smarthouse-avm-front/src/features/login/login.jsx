import LoginBlueprint from "./components/LoginBlueprint";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <main className="grid min-h-screen w-full lg:grid-cols-2">
      <LoginBlueprint />
      <LoginForm />
    </main>
  );
}