/* eslint-disable react/react-in-jsx-scope */
import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Dashboard from '../components/Dashboard'

export const Route = createRootRoute({
    component: () => (
        <>
            <Navigate to="/home" />
            <Dashboard />
            <div className="p-12 w-screen flex flex-col items-center justify-center">
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </>
    ),
})