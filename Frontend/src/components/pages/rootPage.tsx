/* eslint-disable react/react-in-jsx-scope */
import { ClerkProvider } from "@clerk/clerk-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header, FullWidthCentered } from "../layouts";

export function RootPage() {
    return (
        <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
            <Header />
            <FullWidthCentered>
                <Outlet />
            </FullWidthCentered>
            <TanStackRouterDevtools />
            <ReactQueryDevtools />
        </ClerkProvider>
    );
}