import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { AdminRoute, AuthenticatedRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { TicketsPage } from "./ticket/pages/TicketPage";
import { UsersPage } from "./user/pages/UserPage";
import { ClientsPage } from "./client/pages/ClientPage";
import { TicketDetailPage } from "./ticket/pages/TicketDetailPage";

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout').then(m => ({ default: m.AuthLayout })))
const BaseLayout = lazy(() => import('./layouts/BaseLayout').then(m => ({ default: m.BaseLayout })))

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
                element: <TicketsPage />
            },
            {
                path: 'tickets/:id',
                element: <TicketDetailPage />
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
                element: <UsersPage />
            },
            {
                path: 'clientes',
                element: <ClientsPage />
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
])