import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { Loading } from "../components/atoms/Loading/Loading";
import { useAuth } from "../features/auth/hooks/useAuth";

export function ProtectedRoutes({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />
    }
    if (!user && !loading) {
        return <Navigate to="/auth" />
    }
    return (
        <>{children}</>
    )
}