/* eslint-disable react/react-in-jsx-scope */
import { useClientUser } from "../../hooks/users";
import { FeaturedProjects, RecommendedProjectsForClientUser } from "../projects";

export function HomePage() {
    const { clientUser } = useClientUser();

    return (
        <>
            {clientUser &&
                <RecommendedProjectsForClientUser />
            }
            {!clientUser &&
                <FeaturedProjects />
            }
        </>
    );
}