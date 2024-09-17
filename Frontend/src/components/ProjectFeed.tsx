import useClientUser from "../hooks/useClientUser";
import useProjects from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";

/* eslint-disable react/react-in-jsx-scope */
export default function ProjectFeed() {
    const { clientUser } = useClientUser();
    const { projects } = useProjects();

    const heading = clientUser ? 'Projects tailored for you' : 'Hot projects';

    return (
        <>
            <h2 className='text-4xl mb-8'>{heading}</h2>
            <div className='flex flex-row flex-wrap'>
                {projects && projects.map(project => <ProjectCard key={project.title} project={project} />)}
            </div>
        </>
    );
}