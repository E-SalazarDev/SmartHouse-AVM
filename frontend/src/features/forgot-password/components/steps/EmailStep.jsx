import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import EmailField from "../../../login/components/form/EmailField";
import FormError from "../../../login/components/form/FormError";
import SubmitButton from "../../../login/components/form/SubmitButton";

export default function EmailStep({
    email,
    onEmailChange,
    onSubmit,
    isSubmitting,
    formError,
}) {
    return (
        <div>
            <header>
                <h1 className="text-3xl font-bold text-slate-950">
                    ¿Olvidaste tu contraseña?
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Ingresa tu correo electrónico y te enviaremos un código de
                    6 dígitos para restablecerla.
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
                <EmailField
                    value={email}
                    onChange={onEmailChange}
                    disabled={isSubmitting}
                />

                <FormError message={formError} />

                <SubmitButton isLoading={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar código de recuperación"}
                </SubmitButton>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
                <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 font-semibold text-violet-600 hover:text-violet-700"
                >
                    <ArrowLeft size={14} />
                    Volver a iniciar sesión
                </Link>
            </p>
        </div>
    );
}