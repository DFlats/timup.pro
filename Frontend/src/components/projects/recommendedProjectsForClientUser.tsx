/* eslint-disable react/react-in-jsx-scope */
import { ProjectCard } from "..";
import { useRecommendedProjectsForClientUser } from "../../hooks/projects";

export function RecommendedProjectsForClientUser() {
    const maxProjectsInFeed = 10;

    let { recommendedProjectsForClientUser: projects } = useRecommendedProjectsForClientUser();

    if (!projects) return;

    if (projects.length > maxProjectsInFeed)
        projects = projects.slice(0, maxProjectsInFeed);

    return (
        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>Projects you might want to join</h1>
            <div className='flex flex-row flex-wrap'>
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}