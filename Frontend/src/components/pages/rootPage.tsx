/* eslint-disable react/react-in-jsx-scope */
import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet } from "@tanstack/react-router";
import { Header, FullWidthCentered } from "../layouts";
import { shadesOfPurple } from '@clerk/themes'
import Stars from "../layouts/stars";

export function RootPage() {
    return (
        <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={{
            baseTheme: shadesOfPurple,
            layout: {
                unsafe_disableDevelopmentModeWarnings: true,
            },
            variables: {
                colorBackground: "#010624",
                colorText: "#FFFFFF",
                colorInputBackground: "#0e132f",
                fontSize: "1rem",
                spacingUnit: "1.25rem"
            }
        }}>
            <Header />
            <FullWidthCentered>
                <Stars />
                <Outlet />
            </FullWidthCentered>
        </ClerkProvider>
    );
}