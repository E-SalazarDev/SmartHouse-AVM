import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import useLoginForm from "../lib/useLoginForm";
import MobileBrandHeader from "./mobile-brand/MobileBrandHeader";
import EmailField from "./form/EmailField";
import PasswordField from "./form/PasswordField";
import FormError from "./form/FormError";
import RememberMeCheckbox from "./form/RememberMeCheckbox";
import SubmitButton from "./form/SubmitButton";

export default function LoginForm() {
    const {
        formData,
        formError,
        showPassword,
        isLoggingIn,
        handleInputChange,
        toggleShowPassword,
        handleSubmit,
    } = useLoginForm();

    return (
        <section className="flex items-center justify-center bg-white px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm"
            >
                <MobileBrandHeader />

                <header>
                    <h1 className="font-serif text-3xl font-normal text-slate-900">
                        Bienvenido de vuelta
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Ingresa tus credenciales para continuar.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
                    <EmailField
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoggingIn}
                    />

                    <PasswordField
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isLoggingIn}
                        showPassword={showPassword}
                        onToggleShowPassword={toggleShowPassword}
                    />

                    <FormError message={formError} />

                    <RememberMeCheckbox disabled={isLoggingIn} />

                    <SubmitButton isLoading={isLoggingIn}>
                        {isLoggingIn ? "Iniciando sesión..." : "Iniciar sesión"}
                    </SubmitButton>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                    ¿No tienes cuenta?{" "}
                    <Link
                        to="/registro"
                        className="font-semibold text-violet-600 hover:text-violet-700"
                    >
                        Crear cuenta
                    </Link>
                </p>
            </motion.div>
        </section>
    );
}