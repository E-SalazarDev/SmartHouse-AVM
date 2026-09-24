import { useMutation } from "@tanstack/react-query";

import {
    postConfirmPasswordReset,
    postRequestPasswordResetCode,
    postVerifyPasswordResetCode,
} from "../api/forgotPasswordApi";

export function useRequestPasswordResetCode() {
    return useMutation({ mutationFn: postRequestPasswordResetCode });
}

export function useVerifyPasswordResetCode() {
    return useMutation({ mutationFn: postVerifyPasswordResetCode });
}

export function useConfirmPasswordReset() {
    return useMutation({ mutationFn: postConfirmPasswordReset });
}