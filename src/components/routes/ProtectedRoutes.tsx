import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

import { useAuthStore } from "@/auth/store/auth.store";

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore()
    if (authStatus === 'checking') return null;

    if (authStatus === 'authenticated') return <Navigate to="/" />

    return children
}