import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";

export default function useLoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isLoggingIn } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formError, setFormError] = useState("");

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (formError) {
            setFormError("");
        }
    }

    function toggleShowPassword() {
        setShowPassword((current) => !current);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");

        const email = formData.email.trim().toLowerCase();
        const password = formData.password;

        if (!email || !password) {
            setFormError("Ingresa tu correo electrónico y contraseña.");
            return;
        }

        try {
            await login({ email, password });

            const destination = location.state?.from?.pathname ?? "/explorar";
            navigate(destination, { replace: true });
        } catch (error) {
            const message =
                error?.response?.data?.detail ?? "No fue posible iniciar sesión.";
            setFormError(message);
        }
    }

    return {
        formData,
        formError,
        showPassword,
        isLoggingIn,
        handleInputChange,
        toggleShowPassword,
        handleSubmit,
    };
}