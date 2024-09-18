/* eslint-disable react/react-in-jsx-scope */
import { useProjects } from "../hooks";
import { ProjectCard } from ".";
import { ProjectFeedType } from "../types/types";

interface Props {
    projectFeed: ProjectFeedType;
}

export function ProjectFeed({ projectFeed }: Props) {
    const { projects } = useProjects(projectFeed);

    console.log(projectFeed);
    console.log(projects);

    const heading = () => {
        switch (projectFeed) {
            case 'featured':
                return 'Featured projects';
            case 'recommended':
                return 'Projects tailored for you';
            case 'user':
                return 'Your projects';
        }
    }

    return (
        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>{heading()}</h1>
            <div className='flex flex-row flex-wrap'>
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}