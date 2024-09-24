/* eslint-disable react/react-in-jsx-scope */
import { ProjectCard } from "..";
import { useFeaturedProjects, useRecommendedProjectsForClientUser } from "../../hooks/projects";
import { Project } from "../../types";
import { ProjectFeed } from "./layout/projectFeed";
import { ProjectFeedCardContainer } from "./layout/projectFeedCardContainer";
import { ProjectFeedTitle } from "./layout/projectFeedTitle";

export function RecommendedProjectsForClientUser() {
    const { recommendedProjectsForClientUser } = useRecommendedProjectsForClientUser();
    const { featuredProjects } = useFeaturedProjects();
    let projects: Project[] = [];

    if (!recommendedProjectsForClientUser) return;

    if (recommendedProjectsForClientUser.length == 0 && featuredProjects) {
        projects = featuredProjects;
    } else {
        projects = recommendedProjectsForClientUser;
    }

    return (
        <ProjectFeed>
            <ProjectFeedTitle title={`Projects you might want to join`} />
            <ProjectFeedCardContainer>
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </ProjectFeedCardContainer>
        </ProjectFeed>
    );
}