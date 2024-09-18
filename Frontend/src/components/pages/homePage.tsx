/* eslint-disable react/react-in-jsx-scope */
import { useClientUser } from "../../hooks";
import { ProjectFeedType } from "../../types/types";
import { ProjectFeed } from "../../components";

export function HomePage() {
    const { clientUser } = useClientUser();

    const projectFeed = (): ProjectFeedType => {
        if (clientUser)
            return 'recommended'
        else
            return 'featured'
    }

    return (

        <ProjectFeed projectFeed={projectFeed()} />
    );
}