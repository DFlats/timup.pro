/* eslint-disable react/react-in-jsx-scope */
import { useClientUser, useProjects } from "../hooks";
import { ProjectCard } from "./";

export function ProjectFeed() {
    const { clientUser } = useClientUser();
    const { allProjects } = useProjects();

    const heading = clientUser ? 'Projects tailored for you' : 'Hot projects';

    return (

        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>{heading}</h1>
            <div className='flex flex-row flex-wrap'>
                {allProjects && allProjects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}