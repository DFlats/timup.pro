/* eslint-disable react/react-in-jsx-scope */
import { NewProjectCard, ProjectCard } from "..";
import { useProjectsOwnedByClientUser } from "../../hooks/projects";
import { ProjectFeed } from "./layout/projectFeed";
import { ProjectFeedCardContainer } from "./layout/projectFeedCardContainer";
import { ProjectFeedTitle } from "./layout/projectFeedTitle";

export function ProjectsOwnedByClientUser() {
    const { projectsOwnedByClientUser: projects } = useProjectsOwnedByClientUser();

    if (!projects) return;

    return (
        <ProjectFeed>
            <div className="mt-20">
                <ProjectFeedTitle title={`Projects you're a part of`} />
            </div>
            <ProjectFeedCardContainer>
                <NewProjectCard />
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </ProjectFeedCardContainer>
        </ProjectFeed>
    );
}