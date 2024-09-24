/* eslint-disable react/react-in-jsx-scope */
import { useFeaturedProjects } from "../../hooks/projects";
import { ProjectCard } from "./projectCard";

export function FeaturedProjects() {
    const { featuredProjects: projects } = useFeaturedProjects();

    if (!projects) return;

    return (
        <div className="flex flex-col items-center justify-center p-12">
            <h2 className='text-5xl p-8 mb-8'>{'Featured Projects'}</h2>
            <div className='flex flex-row flex-wrap justify-center gap-8'>
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}