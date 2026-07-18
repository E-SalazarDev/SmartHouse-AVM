import {createContext, useEffect, useMemo,} from "react";
import {useMutation,useQuery, useQueryClient,} from "@tanstack/react-query";
import { getCurrentUser, loginUser,logoutUser, } from "../../login/api/authApi";
import { tokenStorage } from "../../../api/tokenStorage";


export const AuthContext = createContext(null);


const CURRENT_USER_QUERY_KEY = [
    "auth",
    "current-user",
];


export default function AuthProvider({
    children,
}) {
    const queryClient = useQueryClient();

    const accessToken =
        tokenStorage.getAccessToken();

    const currentUserQuery = useQuery({
        queryKey: CURRENT_USER_QUERY_KEY,
        queryFn: getCurrentUser,
        enabled: Boolean(accessToken),
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });


    // Si /auth/me/ falla, eliminamos la sesión almacenada localmente.
    
    useEffect(() => {
        if (!currentUserQuery.isError) {
            return;
        }

        tokenStorage.clearTokens();

        queryClient.setQueryData(
            CURRENT_USER_QUERY_KEY,
            null,
        );
    }, [
        currentUserQuery.isError,
        queryClient,
    ]);


    
    //  iniciar sesión
    
    const loginMutation = useMutation({
        mutationFn: loginUser,

        onSuccess: (authData) => {
            tokenStorage.setTokens({
                access: authData.access,
                refresh: authData.refresh,
            });

          
            queryClient.setQueryData(
                CURRENT_USER_QUERY_KEY,
                authData.user,
            );
        },
    });


    //  cerrar sesión
    const logoutMutation = useMutation({
        mutationFn: async () => {
            const refreshToken =
                tokenStorage.getRefreshToken();

            if (!refreshToken) {
                return;
            }

            await logoutUser(refreshToken);
        },

        // Limpiamos la sesión
        onSettled: () => {
            tokenStorage.clearTokens();

            queryClient.setQueryData(
                CURRENT_USER_QUERY_KEY,
                null,
            );

            queryClient.removeQueries({
                queryKey: ["favorites"],
            });
        },
    });


    const user =
        currentUserQuery.data ?? null;

    const isAuthenticated =
        Boolean(user);

    
    //  combrobar  sesión almacenada

    const isLoading =
        Boolean(accessToken) &&
        currentUserQuery.isLoading;


    async function login(credentials) {
        return loginMutation.mutateAsync(
            credentials,
        );
    }


    async function logout() {
        return logoutMutation.mutateAsync();
    }


    const contextValue = useMemo(
        () => ({
            user,
            isAuthenticated,
            isLoading,

            login,
            logout,

            isLoggingIn:
                loginMutation.isPending,

            loginError:
                loginMutation.error,

            isLoggingOut:
                logoutMutation.isPending,
        }),
        [
            user,
            isAuthenticated,
            isLoading,
            loginMutation.isPending,
            loginMutation.error,
            logoutMutation.isPending,
        ],
    );


    return (
        <AuthContext.Provider
            value={contextValue}
        >
            {children}
        </AuthContext.Provider>
    );
}