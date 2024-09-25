/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";

import { useProjectById } from "../../hooks/projects";
import { useClientUser, useCollaborators } from "../../hooks/users";

import { NotFound } from "../routing";
import { CollaboratorTable, RecommendedUserTable, UserCard } from "../users";
import { TagContainer } from "../tags";
import { useTransactionActions } from "../../hooks";

export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const { id } = Route.useParams() as { id: string };
    const projectId = parseInt(id);

    const { clientUser, clientUserIsCollaboratorOrAuthorOfProject } = useClientUser();
    const { projectById } = useProjectById(projectId);
    const { joinProjectRequest } = useTransactionActions();

    const {
        collaboratorsInProject,
        countCollaboratorTags
    } = useCollaborators(projectId);

    if (!projectById) {
        return (<NotFound>
            <p>{`Sorry, project with id ${projectId} doesn't exist ${String.raw`¯\_(ツ)_/¯`}`}</p>
        </NotFound>)
    }

    if (!collaboratorsInProject) return;

    const countedProjectTags = countCollaboratorTags(projectById.tags);

    return (
        <><div
            className="min-h-screen" >
            <div className="bg-opacity-95"></div>
            <div className="text-neutral-content text-center">
                <div className="max-w-screen">
                    <div className="flex justify-between mt-10 mb-16 gap-20">
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-5xl text-slate-50 text-left font-bold pt-4 pb-6">{projectById.title}</h1>
                                <p className="max-w-3xl text-left">{projectById.description}</p>
                            </div>

                            <div className="flex-1"></div>

                            <div className="self-start pt-4 pb-2">
                                <p>{`Collaborators: ${projectById.collaborators.length}`}</p>
                            </div>

                            <div className="w-full">
                                <TagContainer tags={countedProjectTags['skill']} tagType='skill' />
                                <TagContainer tags={countedProjectTags['interest']} tagType='interest' />
                            </div>
                        </div>

                        <UserCard userId={projectById.authorId} pageTitle='Project Owner' />
                    </div>

                    {clientUser && !clientUserIsCollaboratorOrAuthorOfProject(projectById) &&
                        <button
                            className='btn'
                            onClick={() => joinProjectRequest(clientUser.id, projectId)}>
                            Ask to join project
                        </button>
                    }

                    <h2 className='text-4xl m-2 p-10'>Collaborators</h2>
                    <CollaboratorTable projectId={projectId} />

                    <h2 className='text-4xl m-2 p-10'>Suggested Collaborators</h2>
                    <RecommendedUserTable projectId={projectId} />
                </div>
            </div>
        </div >
        </>);
}