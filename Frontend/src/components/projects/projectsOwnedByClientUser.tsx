/* eslint-disable react/react-in-jsx-scope */
import { NewProjectCard, ProjectCard } from "..";
import { useProjectsOwnedByClientUser } from "../../hooks/projects";

export function ProjectsOwnedByClientUser() {
    const { projectsOwnedByClientUser: projects } = useProjectsOwnedByClientUser();

    if (!projects) return;

    return (
        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>{`Projects you're a part of`}</h1>
            <div className='flex flex-row flex-wrap'>
                <NewProjectCard />
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}