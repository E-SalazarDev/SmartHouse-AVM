import PasswordInput from "../PasswordInput";
import FormError from "../../../login/components/form/FormError";
import SubmitButton from "../../../login/components/form/SubmitButton";

export default function NewPasswordStep({
    newPassword,
    newPasswordConfirm,
    onNewPasswordChange,
    onNewPasswordConfirmChange,
    onSubmit,
    isSubmitting,
    formError,
}) {
    return (
        <div>
            <header>
                <h1 className="text-3xl font-bold text-slate-950">
                    Crea una nueva contraseña
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Elige una contraseña segura: mínimo 8 caracteres, que no sea
                    común ni solo numérica.
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
                <PasswordInput
                    id="new-password"
                    label="Nueva contraseña"
                    value={newPassword}
                    onChange={onNewPasswordChange}
                    disabled={isSubmitting}
                />

                <PasswordInput
                    id="new-password-confirm"
                    label="Confirmar contraseña"
                    value={newPasswordConfirm}
                    onChange={onNewPasswordConfirmChange}
                    disabled={isSubmitting}
                />

                <FormError message={formError} />

                <SubmitButton isLoading={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Restablecer contraseña"}
                </SubmitButton>
            </form>
        </div>
    );
}