import { useState } from "react";

export default function useForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleInputChange(event) {
        setEmail(event.target.value);

        if (formError) {
            setFormError("");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");

        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedEmail) {
            setFormError("Ingresa tu correo electrónico.");
            return;
        }

        setIsSubmitting(true);

        try {
            // TODO: reemplazar por la llamada real cuando exista el endpoint en el backend.
            // await apiClient.post("/auth/password-reset/", { email: trimmedEmail });
            await new Promise((resolve) => setTimeout(resolve, 800));

            setIsSubmitted(true);
        } catch (error) {
            const message =
                error?.response?.data?.detail ??
                "No fue posible enviar el correo de recuperación.";
            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        email,
        formError,
        isSubmitting,
        isSubmitted,
        handleInputChange,
        handleSubmit,
    };
}