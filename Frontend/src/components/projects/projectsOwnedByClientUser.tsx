/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { NewProjectCard, ProjectCard } from "..";
import { useProjectsOwnedByClientUser } from "../../hooks/projects";
import { useClientUser, useUserById } from "../../hooks/users";
import { ProjectFeed } from "./layout/projectFeed";
import { ProjectFeedCardContainer } from "./layout/projectFeedCardContainer";
import { ProjectFeedTitle } from "./layout/projectFeedTitle";

export function ProjectsOwnedByClientUser() {
    const Route = getRouteApi('/profile/$userId');
    const { userId } = Route.useParams() as { userId: string };
    const { projectsOwnedByClientUser: projects } = useProjectsOwnedByClientUser(userId);
    const { userById: user } = useUserById(userId);
    
    const { clientUser } = useClientUser();

    if (!user) return;

    const userIsClient = clientUser && user.id == clientUser.id;

    if (!projects) return;

    return (
        <ProjectFeed>
            <div className="mt-20">
                {userIsClient ?
                    <ProjectFeedTitle title={`Projects you're a part of`} />
                    :
                    <ProjectFeedTitle title={`Projects they're a part of`} />
                }
            </div>
            <ProjectFeedCardContainer>
                {userIsClient &&
                    <NewProjectCard />
                }
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </ProjectFeedCardContainer>
        </ProjectFeed>
    );
}