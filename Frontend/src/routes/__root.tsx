/* eslint-disable react/react-in-jsx-scope */
import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Dashboard from '../components/Dashboard'
import { ClerkProvider } from '@clerk/clerk-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/home">
                <Navigate to="/home" />
                <Dashboard />
                <div className="p-12 w-screen flex flex-col items-center justify-center">
                    <Outlet />
                </div>
                <TanStackRouterDevtools />
                <ReactQueryDevtools />
            </ClerkProvider>
        </>
    ),
})