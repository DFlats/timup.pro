/* eslint-disable react/react-in-jsx-scope */
import { useUsers } from "../../hooks";
import { ProjectFeedType } from "../../types/types";
import { ProjectFeed } from "../../components";

export function HomePage() {
    const { clientUser } = useUsers({ type: 'clientUser' });

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