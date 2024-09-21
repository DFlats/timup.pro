/* eslint-disable react/react-in-jsx-scope */
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { FeaturedProjects, RecommendedProjectsForClientUser } from "../projects";

export function HomePage() {
    return (
        <>
            <SignedIn>
                <RecommendedProjectsForClientUser />
            </SignedIn>
            <SignedOut>
                <FeaturedProjects />
            </SignedOut>
        </>
    );
}