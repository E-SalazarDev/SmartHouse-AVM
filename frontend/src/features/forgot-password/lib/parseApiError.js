const DEFAULT_MESSAGE = "Ocurrió un error inesperado. Inténtalo de nuevo.";

function toText(value) {
    if (Array.isArray(value)) {
        return value.map(toText).join(" ");
    }

    if (value && typeof value === "object") {
        return Object.values(value).map(toText).join(" ");
    }

    return typeof value === "string" ? value : "";
}

/**
 * Convierte un error de axios en:
 * - message: texto listo para mostrar en el formulario
 * - fields: errores por campo del backend (code, new_password, email, ...)
 */
export function parseApiError(error) {
    const response = error?.response;

    if (!response) {
        return {
            message: "No pudimos conectar con el servidor. Revisa tu conexión.",
            fields: {},
        };
    }

    if (response.status === 429) {
        return {
            message:
                "Demasiados intentos. Espera un momento antes de volver a intentarlo.",
            fields: {},
        };
    }

    const data = response.data;

    if (!data || typeof data !== "object") {
        return { message: DEFAULT_MESSAGE, fields: {} };
    }

    const fields = Object.fromEntries(
        Object.entries(data)
            .map(([key, value]) => [key, toText(value)])
            .filter(([, text]) => text),
    );

    const message =
        fields.detail ||
        fields.code ||
        fields.new_password ||
        fields.new_password_confirm ||
        fields.email ||
        Object.values(fields)[0] ||
        DEFAULT_MESSAGE;

    return { message, fields };
}