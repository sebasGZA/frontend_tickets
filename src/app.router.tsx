import { createBrowserRouter, Navigate } from "react-router";

import { NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";
import { AuthLayout } from "./auth/layouts/AuthLayout";
import { LoginPage } from "./auth/pages/login/LoginPage";

export const appRouter = createBrowserRouter([
    {
        path: '/auth',
        element:
            <NotAuthenticatedRoute>
                <AuthLayout />
            </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/auth" />
    }
])