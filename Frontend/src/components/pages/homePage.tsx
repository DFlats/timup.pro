/* eslint-disable react/react-in-jsx-scope */
import { useClientUser } from "../../hooks";
import { ProjectFeedType } from "../../types/types";
import { ProjectFeed } from "../../components";

export function HomePage() {
    const { clientUser } = useClientUser();

    const projectFeed = (): ProjectFeedType => {
        if (clientUser)
            return 'recommendedForUser'
        else
            return 'featured'
    }

    return (
        <>
            <p>{projectFeed()}</p>
            <ProjectFeed projectFeed={projectFeed()} />
        </>
    );
}