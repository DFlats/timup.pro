/* eslint-disable react/react-in-jsx-scope */
import { useProjects } from "../../hooks";
import { NewProjectCard, ProjectCard } from "..";
import { ProjectFeedType } from "../../types/types";

interface Props {
    projectFeed: ProjectFeedType;
}

export function ProjectFeed({ projectFeed }: Props) {
    const maxProjectsInFeed = 10;

    const {
        featuredProjects,
        recommendedProjectsForClientUser,
        projectsOwnedByClientUser
    } = useProjects({ type: projectFeed });


    let projects =
        (featuredProjects ??
            (recommendedProjectsForClientUser ??
                projectsOwnedByClientUser));

    if (!projects) return;

    if (projects.length > maxProjectsInFeed)
        projects = projects.slice(0, maxProjectsInFeed);

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
        <div className="flex flex-col items-center justify-center p-12">
            <h2 className='text-5xl p-8 mb-8'>{heading()}</h2>
            <div className='flex flex-row flex-wrap justify-center gap-8'>
                {projectFeed == 'projectsOwnedByClientUser' &&
                    <NewProjectCard />
                }
                {projects && projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </div>
    );
}