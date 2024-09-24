/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useProjectById } from "../../hooks/projects";
import { NotFound } from "../routing";
import { UserTable } from "../users";
import { TagContainer } from "../tags";
import { useCollaborators } from "../../hooks/users/useCollaborators";
import { useRecommendedUsersForProject } from "../../hooks/users";

export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const projectId = Number.parseInt(Route.useParams().id);

    const { projectById: project } = useProjectById(projectId);
    const { collaboratorsInProject } = useCollaborators(projectId);
    const { recommendedUsersForProject } = useRecommendedUsersForProject(projectId);

    if (!project) {
        return (<NotFound>
            <p>{`Sorry, project with id ${projectId} doesn't exist ${String.raw`¯\_(ツ)_/¯`}`}</p>
        </NotFound>)
    }

    if (!collaboratorsInProject) return;

    for (const tag of project.tags['skill']) {
        for (const collaborator of collaboratorsInProject) {
            for (const collaboratorTag of collaborator.tags['skill']) {
                if (collaboratorTag.title == tag.title) {
                    tag.count = tag.count == undefined ? 0 : tag.count + 1;
                }
            }
        }
    }

    console.log(project.tags['skill']);

    return (
        <><div
            className="hero min-h-screen" >
            <div className="hero-overlay bg-opacity-95"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-screen-lg">
                    <h1 className="text-5xl font-bold">{project.title}</h1>
                    <p className="py-6">{project.description}</p>
                    <TagContainer tags={project.tags['skill']} tagType='skill' />
                    <TagContainer tags={project.tags['interest']} tagType='interest' />
                    <h2 className='text-2xl m-2'>Collaborators</h2>
                    {collaboratorsInProject &&
                        <UserTable
                            users={collaboratorsInProject} />
                    }
                    <h2 className='text-2xl m-2'>Suggested Collaborators</h2>
                    {recommendedUsersForProject &&
                        <UserTable
                            users={recommendedUsersForProject}
                            onInvite={(userId) => console.log(`Invite user ${userId}`)} />
                    }
                </div>
            </div>
        </div >
        </>);
}