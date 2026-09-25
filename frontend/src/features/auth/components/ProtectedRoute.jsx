import {Navigate, useLocation, } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function ProtectedRoute({ children, }) {
    const location = useLocation();

    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-sm text-slate-500">
                    Verificando sesión...
                </p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    return children;
}