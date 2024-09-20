/* eslint-disable react/react-in-jsx-scope */
import { useFeaturedProjects } from "../../hooks/projects";
import { ProjectCard } from "./projectCard";

export function FeaturedProjects() {
    const maxProjectsInFeed = 10;

    let { featuredProjects: projects } = useFeaturedProjects();

    if (!projects) return;

    if (projects.length > maxProjectsInFeed)
        projects = projects.slice(0, maxProjectsInFeed);

    return (
        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>{'Featured Projects'}</h1>
            <div className='flex flex-row flex-wrap'>
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}