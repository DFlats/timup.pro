/* eslint-disable react/react-in-jsx-scope */
import { ProjectCard } from "..";
import { useFeaturedProjects, useRecommendedProjectsForClientUser } from "../../hooks/projects";
import { Project } from "../../types";

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
        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>Projects you might want to join</h1>
            <div className='flex flex-row flex-wrap'>
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}