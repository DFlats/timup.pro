/* eslint-disable react/react-in-jsx-scope */
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ClerkProvider } from '@clerk/clerk-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Header from '../layouts/Header'

export const Route = createRootRoute({
    component: () => (
        <>
            <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
                <Header />
                <div className="p-12 w-screen flex flex-col items-center justify-center">
                    <Outlet />
                </div>
                <TanStackRouterDevtools />
                <ReactQueryDevtools />
            </ClerkProvider>
        </>
    ),
})