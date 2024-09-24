/* eslint-disable react/react-in-jsx-scope */
import { useFeaturedProjects } from "../../hooks/projects";
import { ProjectFeed } from "./layout/projectFeed";
import { ProjectFeedCardContainer } from "./layout/projectFeedCardContainer";
import { ProjectFeedTitle } from "./layout/projectFeedTitle";
import { ProjectCard } from "./projectCard";

export function FeaturedProjects() {
    const { featuredProjects: projects } = useFeaturedProjects();

    if (!projects) return;

    return (
        <ProjectFeed>
            <ProjectFeedTitle title={`Featured projects`} />
            <ProjectFeedCardContainer>
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </ProjectFeedCardContainer>
        </ProjectFeed>
    );
}