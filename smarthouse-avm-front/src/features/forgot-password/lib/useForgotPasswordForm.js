import { useEffect, useState } from "react";

import {
    useConfirmPasswordReset,
    useRequestPasswordResetCode,
    useVerifyPasswordResetCode,
} from "../hooks/usePasswordResetMutations";
import { parseApiError } from "./parseApiError";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Acepta tanto un evento de input como un string directo.
function readValue(eventOrValue) {
    if (typeof eventOrValue === "string") {
        return eventOrValue;
    }

    return eventOrValue?.target?.value ?? "";
}

/**
 * Flujo de recuperación de contraseña en 4 pasos:
 * email -> code -> password -> success
 */
export default function useForgotPasswordForm() {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [formError, setFormError] = useState("");
    const [resendCooldown, setResendCooldown] = useState(0);

    const requestCode = useRequestPasswordResetCode();
    const verifyCode = useVerifyPasswordResetCode();
    const confirmReset = useConfirmPasswordReset();

    const isSubmitting =
        requestCode.isPending || verifyCode.isPending || confirmReset.isPending;

    useEffect(() => {
        if (resendCooldown <= 0) {
            return undefined;
        }

        const timer = setTimeout(() => {
            setResendCooldown((seconds) => seconds - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [resendCooldown]);

    async function sendCode(targetEmail) {
        await requestCode.mutateAsync(targetEmail);
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
    }

    function handleEmailChange(eventOrValue) {
        setEmail(readValue(eventOrValue));
        setFormError("");
    }

    async function handleEmailSubmit(event) {
        event.preventDefault();

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            setFormError("Ingresa tu correo electrónico.");
            return;
        }

        if (!EMAIL_PATTERN.test(normalizedEmail)) {
            setFormError("Ingresa un correo electrónico válido.");
            return;
        }

        setFormError("");

        try {
            await sendCode(normalizedEmail);
            setEmail(normalizedEmail);
            setCode("");
            setStep("code");
        } catch (error) {
            setFormError(parseApiError(error).message);
        }
    }

    function handleCodeChange(value) {
        setCode(value);
        setFormError("");
    }

    async function handleCodeSubmit(event) {
        event.preventDefault();

        if (code.length !== CODE_LENGTH) {
            setFormError("Ingresa los 6 dígitos del código.");
            return;
        }

        setFormError("");

        try {
            await verifyCode.mutateAsync({ email, code });
            setStep("password");
        } catch (error) {
            setCode("");
            setFormError(parseApiError(error).message);
        }
    }

    async function handleResendCode() {
        if (resendCooldown > 0 || isSubmitting) {
            return;
        }

        setFormError("");

        try {
            await sendCode(email);
            setCode("");
        } catch (error) {
            setFormError(parseApiError(error).message);
        }
    }

    function handleChangeEmail() {
        setStep("email");
        setCode("");
        setResendCooldown(0);
        setFormError("");
    }

    function handleNewPasswordChange(eventOrValue) {
        setNewPassword(readValue(eventOrValue));
        setFormError("");
    }

    function handleNewPasswordConfirmChange(eventOrValue) {
        setNewPasswordConfirm(readValue(eventOrValue));
        setFormError("");
    }

    async function handleNewPasswordSubmit(event) {
        event.preventDefault();

        if (!newPassword) {
            setFormError("Ingresa tu nueva contraseña.");
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            setFormError("Las contraseñas no coinciden.");
            return;
        }

        setFormError("");

        try {
            await confirmReset.mutateAsync({
                email,
                code,
                newPassword,
                newPasswordConfirm,
            });
            setStep("success");
        } catch (error) {
            const { message, fields } = parseApiError(error);

            // El código venció o se agotaron los intentos: hay que pedir otro.
            if (fields.code) {
                setCode("");
                setStep("code");
            }

            setFormError(message);
        }
    }

    return {
        step,
        email,
        code,
        newPassword,
        newPasswordConfirm,
        formError,
        isSubmitting,
        resendCooldown,
        handleEmailChange,
        handleEmailSubmit,
        handleCodeChange,
        handleCodeSubmit,
        handleResendCode,
        handleChangeEmail,
        handleNewPasswordChange,
        handleNewPasswordConfirmChange,
        handleNewPasswordSubmit,
    };
}