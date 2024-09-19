/* eslint-disable react/react-in-jsx-scope */
import { useProjects } from "../../hooks";
import { NewProjectCard, ProjectCard } from "..";
import { ProjectFeedType } from "../../types/types";

interface Props {
    projectFeed: ProjectFeedType;
}

export function ProjectFeed({ projectFeed }: Props) {
    const { featuredProjects, recommendedProjectsForClientUser, projectsOwnedByClientUser } = useProjects({ type: projectFeed });

    const projects =
        featuredProjects ??
        (recommendedProjectsForClientUser ??
            projectsOwnedByClientUser);

    const heading = () => {
        switch (projectFeed) {
            case 'featuredProjects':
                return 'Featured projects';
            case 'recommendedProjectsForClientUser':
                return 'Projects tailored for you';
            case 'projectsOwnedByClientUser':
                return 'Your projects';
        }
    }

    return (
        <div className="p-12 w-screen flex flex-col items-center justify-center">
            <h1 className='text-4xl mb-8'>{heading()}</h1>
            <div className='flex flex-row flex-wrap'>
                {projectFeed == 'projectsOwnedByClientUser' &&
                    <NewProjectCard />
                }
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}