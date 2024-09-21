/* eslint-disable react/react-in-jsx-scope */
import { NewProjectCard, ProjectCard } from "..";
import { useProjectsOwnedByClientUser } from "../../hooks/projects";

export function ProjectsOwnedByClientUser() {
    const maxProjectsInFeed = 10;

    let { projectsOwnedByClientUser: projects } = useProjectsOwnedByClientUser();

    if (!projects) return;

    if (projects.length > maxProjectsInFeed)
        projects = projects.slice(0, maxProjectsInFeed);

    return (
        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>Projects tailored for you</h1>
            <div className='flex flex-row flex-wrap'>
                <NewProjectCard />
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}