/* eslint-disable react/react-in-jsx-scope */
import { useClientUser, useProjects } from "../hooks";
import { ProjectCard } from ".";

interface Props {
    projectFeed: 'featured' | 'recommended' | 'user';
}

export function ProjectFeed({ projectFeed }: Props) {
    const { clientUser } = useClientUser();
    const { projects } = useProjects(projectFeed);

    const heading = clientUser ? 'Projects tailored for you' : 'Featured projects';

    return (

        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>{heading}</h1>
            <div className='flex flex-row flex-wrap'>
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}