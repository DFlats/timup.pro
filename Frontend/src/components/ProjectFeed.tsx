import useProjects from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";

/* eslint-disable react/react-in-jsx-scope */
export default function ProjectFeed() {
    const { projects } = useProjects();

    return (
        <div className='flex flex-row flex-wrap'>
            {projects && projects.map(project => <ProjectCard key={project.title} project={project} />)}
        </div>
    );
}