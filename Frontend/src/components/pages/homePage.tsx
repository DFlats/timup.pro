/* eslint-disable react/react-in-jsx-scope */

import { HeroSection } from "../layouts/heroSection";
import "./homePage.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { FeaturedProjects, RecommendedProjectsForClientUser } from "../projects";

export function HomePage() {

    return (
        <>
            <SignedOut>
                <HeroSection />
                <FeaturedProjects />
            </SignedOut>


            <SignedIn>
                <RecommendedProjectsForClientUser />
            </SignedIn>
        </>
    );
}