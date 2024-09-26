/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";

import { useProjectById } from "../../hooks/projects";
import { useClientUser, useCollaborators, useProjectAuthor } from "../../hooks/users";

import { NotFound } from "../routing";
import { CollaboratorTable, RecommendedUserTable, UserCard } from "../users";
import { TagContainer } from "../tags";
import { useTransactionActions } from "../../hooks";
import { useState } from "react";

export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const { id } = Route.useParams() as { id: string };
    const projectId = parseInt(id);
    const { author, clientUserIsAuthor } = useProjectAuthor(projectId);
    const [projectRequest, setProjectRequest] = useState("Request");

    const { clientUser, clientUserIsCollaboratorOrAuthorOfProject } = useClientUser();
    const { projectById } = useProjectById(projectId);
    const { joinProjectRequest } = useTransactionActions();

    const {
        collaboratorsInProject,
        countSuppliedProjectTags
    } = useCollaborators(projectId);

    if (!projectById) {
        return (<NotFound>
            <p>{`Sorry, project with id ${projectId} doesn't exist ${String.raw`¯\_(ツ)_/¯`}`}</p>
        </NotFound>)
    }

    if (!collaboratorsInProject || !author) return;

    const countedProjectTags = countSuppliedProjectTags(author, projectById.tags);

    function handleJoinProjectRequest(userId: string, projectId: number) {
        joinProjectRequest(userId, projectId);
        setProjectRequest("Success");
    }

    console.log(clientUserIsCollaboratorOrAuthorOfProject(projectById))

    return (
        <><div
            className="min-h-screen" >
            <div className="bg-opacity-95"></div>
            <div className="text-neutral-content text-center">
                <div className="max-w-screen">
                    <div className="flex justify-between mt-10 mb-16 gap-10">

                        <div className="flex flex-col w-full">
                            <div>
                                <h1 className="max-w-3xl text-5xl text-slate-50 text-left font-bold pt-4 pb-6">{projectById.title}</h1>
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

                    {!clientUserIsCollaboratorOrAuthorOfProject(projectById) && clientUser &&
                        <div className="flex flex-col items-center">
                            <div className="animate-bounce w-8 h-8">
                                <div className="h-0 w-0 border-x-[16px] border-x-transparent border-t-[32px] border-slate-50"></div>
                            </div>
                            <button
                                className={`btn w-96 text-slate-50 text-xl m-5 mb-10 ${projectRequest === "Success" ? "btn-success" : "btn-accent"}`}
                                onClick={() => handleJoinProjectRequest(clientUser.id, projectId)}>
                                {projectRequest === "Success" ? "Request Sent" : "Ask to Join Project"}
                            </button>
                        </div>
                    }

                    <h2 className='text-4xl m-2 p-10'>Collaborators</h2>
                    <CollaboratorTable projectId={projectId} />
                    {clientUserIsAuthor &&
                        <>
                            <h2 className='text-4xl m-2 p-10'>Suggested Collaborators</h2>
                            <RecommendedUserTable projectId={projectId} />
                        </>
                    }

                </div>
            </div>
        </div >
        </>);
}