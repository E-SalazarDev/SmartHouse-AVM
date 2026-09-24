import { apiClient } from "../../../api/apiClient";

export async function postRequestPasswordResetCode(email) {
    const response = await apiClient.post("/auth/password-reset/request/", {
        email,
    });
    return response.data;
}

export async function postVerifyPasswordResetCode({ email, code }) {
    const response = await apiClient.post("/auth/password-reset/verify/", {
        email,
        code,
    });
    return response.data;
}

export async function postConfirmPasswordReset({
    email,
    code,
    newPassword,
    newPasswordConfirm,
}) {
    const response = await apiClient.post("/auth/password-reset/confirm/", {
        email,
        code,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
    });
    return response.data;
}