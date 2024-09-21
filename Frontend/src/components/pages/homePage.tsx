/* eslint-disable react/react-in-jsx-scope */

import { useUsers } from "../../hooks";
import { ProjectFeedType } from "../../types/types";
import { ProjectFeed } from "../../components";
import { HeroSection } from "../layouts/heroSection";
import "./homePage.css";
import Stars from "./stars";

export function HomePage() {
    const { clientUser } = useUsers({ type: 'clientUser' });

    const projectFeed = (): ProjectFeedType => {
        if (clientUser)
            return 'recommendedProjectsForClientUser'
        else
            return 'featuredProjects'
    }

    return (
        <>
            <Stars />
            <HeroSection />
            <ProjectFeed projectFeed={projectFeed()} />
        </>
    );
}