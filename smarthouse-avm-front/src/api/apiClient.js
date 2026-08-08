import axios from "axios";

import { tokenStorage } from "./tokenStorage";


export const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


export const apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});


const refreshClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const accessToken =
            tokenStorage.getAccessToken();

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


let refreshPromise = null;


apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        const isUnauthorized =
            error.response?.status === 401;

        const alreadyRetried =
            originalRequest?._retry === true;

        const isAuthEndpoint =
            originalRequest?.url?.includes(
                "/auth/login/"
            ) ||
            originalRequest?.url?.includes(
                "/auth/register/"
            ) ||
            originalRequest?.url?.includes(
                "/auth/refresh/"
            );

        if (
            !isUnauthorized ||
            alreadyRetried ||
            isAuthEndpoint
        ) {
            return Promise.reject(error);
        }

        const refreshToken =
            tokenStorage.getRefreshToken();

        if (!refreshToken) {
            tokenStorage.clearTokens();

            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = refreshClient
                    .post(
                        "/auth/refresh/",
                        {
                            refresh: refreshToken,
                        }
                    )
                    .then((response) => {
                        const {
                            access,
                            refresh,
                        } = response.data;

                        tokenStorage.setTokens({
                            access,
                            refresh,
                        });

                        return access;
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            const newAccessToken =
                await refreshPromise;

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return apiClient(
                originalRequest
            );
        } catch (refreshError) {
            tokenStorage.clearTokens();

            return Promise.reject(
                refreshError
            );
        }
    }
);