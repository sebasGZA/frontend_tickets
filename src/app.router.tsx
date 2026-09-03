import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { AdminRoute, AuthenticatedRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";
import { LoginPage } from "./auth/pages/login/LoginPage";

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout').then(m => ({ default: m.AuthLayout })))
const BaseLayout = lazy(() => import('./ticket/layouts/BaseLayout').then(m => ({ default: m.BaseLayout })))

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element:
            <AuthenticatedRoute>
                <BaseLayout />
            </AuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <h1>Tickets page</h1>
            },
        ],
    },
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
        path: 'admin',
        element:
            <AdminRoute>
                <BaseLayout />
            </AdminRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/admin/usuarios" />
            },
            {
                path: 'usuarios',
                element: <h1>Usuarios page</h1>
            },
            {
                path: 'clientes',
                element: <h1>Clientes page</h1>
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
])