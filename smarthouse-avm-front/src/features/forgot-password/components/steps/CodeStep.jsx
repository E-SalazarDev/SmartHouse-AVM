import { ArrowLeft, MailCheck } from "lucide-react";

import OtpInput from "../OtpInput";
import FormError from "../../../login/components/form/FormError";
import SubmitButton from "../../../login/components/form/SubmitButton";

export default function CodeStep({
    email,
    code,
    onCodeChange,
    onSubmit,
    onResend,
    onChangeEmail,
    resendCooldown,
    isSubmitting,
    formError,
}) {
    return (
        <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                <MailCheck size={22} className="text-violet-600" />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-950">
                Revisa tu correo
            </h1>
            <p className="mt-2 text-sm text-slate-500">
                Si existe una cuenta asociada a{" "}
                <span className="font-semibold text-slate-700">{email}</span>,
                te enviamos un código de 6 dígitos. Vence en 10 minutos.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
                <OtpInput
                    value={code}
                    onChange={onCodeChange}
                    disabled={isSubmitting}
                    hasError={Boolean(formError)}
                />

                <FormError message={formError} />

                <SubmitButton isLoading={isSubmitting}>
                    {isSubmitting ? "Verificando..." : "Verificar código"}
                </SubmitButton>
            </form>

            <div className="mt-6 flex flex-col items-center gap-3 text-sm text-slate-500">
                <p>
                    ¿No te llegó?{" "}
                    {resendCooldown > 0 ? (
                        <span className="font-semibold text-slate-400">
                            Reenviar en {resendCooldown} s
                        </span>
                    ) : (
                        <button
                            type="button"
                            onClick={onResend}
                            disabled={isSubmitting}
                            className="font-semibold text-violet-600 hover:text-violet-700 disabled:opacity-60"
                        >
                            Reenviar código
                        </button>
                    )}
                </p>

                <button
                    type="button"
                    onClick={onChangeEmail}
                    className="inline-flex items-center gap-1.5 font-semibold text-violet-600 hover:text-violet-700"
                >
                    <ArrowLeft size={14} />
                    Usar otro correo
                </button>
            </div>
        </div>
    );
}