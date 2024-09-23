/* eslint-disable react/react-in-jsx-scope */

import { HeroSection } from "../layouts/heroSection";
import "./homePage.css";
import Stars from "../layouts/stars";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { FeaturedProjects, RecommendedProjectsForClientUser } from "../projects";

export function HomePage() {

    return (
        <>
            <SignedOut>
                <Stars />
                <HeroSection />
                <FeaturedProjects />
            </SignedOut>
            <SignedIn>
                <RecommendedProjectsForClientUser />
            </SignedIn>
        </>
    );
}