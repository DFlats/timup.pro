/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useProjectById } from "../../hooks/projects";
import { NotFound } from "../routing";
import { UserTable } from "../users";
import { TagContainer } from "../tags";
import { useTransactionActions } from "../../hooks";
import { Tags } from "../../types";
import { useCollaborators, useRecommendedUsersForProject } from "../../hooks/users";
import { UserCard } from "../users/userCard";

export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const { id: id } = Route.useParams() as { id: string };
    const projectId = parseInt(id);

    const { projectById: project } = useProjectById(projectId);
    const { collaboratorsInProject, collaboratorsNextPage, collaboratorsPreviousPage } = useCollaborators(projectId);
    const { recommendedUsersForProject, recommendedUsersNextPage, recommendedUsersPreviousPage } = useRecommendedUsersForProject(projectId);
    const { inviteUserToProjectRequest } = useTransactionActions();

    if (!project) {
        return (<NotFound>
            <p>{`Sorry, project with id ${projectId} doesn't exist ${String.raw`¯\_(ツ)_/¯`}`}</p>
        </NotFound>)
    }

    if (!collaboratorsInProject) return;

    const projectTags = {
        'skill': project.tags['skill'].map(projectTag => ({
            ...projectTag,
            count: collaboratorsInProject.reduce((currentSum, collaborator) =>
                currentSum + (collaborator.tags['skill'].find(t => t.title == projectTag.title) ? 1 : 0), 0)
        })),
        'interest': project.tags['interest'].map(projectTag => ({
            ...projectTag,
            count: collaboratorsInProject.reduce((currentSum, collaborator) =>
                currentSum + (collaborator.tags['interest'].find(t => t.title == projectTag.title) ? 1 : 0), 0)
        })),
    } as Tags;

    const handleInvite = (userId: string) => {
        console.log(`Invites user ${userId} to project ${projectId}`);
        inviteUserToProjectRequest(userId, projectId);
    }

    return (
        <><div
            className="min-h-screen" >
            <div className="bg-opacity-95"></div>
            <div className="text-neutral-content text-center">
                <div className="max-w-screen">
                    <div className="flex justify-between mt-10 mb-16 gap-20">
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-5xl text-slate-50 text-left font-bold pt-4 pb-6">{project.title}</h1>
                                <p className="max-w-3xl text-left">{project.description}</p>
                            </div>
                            <div className="flex-1"></div>
                            <div className="self-start pt-4 pb-2">
                                <p>{`Collaborators: ${project.collaborators.length}`}</p>
                            </div>
                            <div className="w-full">
                                <TagContainer tags={projectTags['skill']} tagType='skill' />
                                <TagContainer tags={projectTags['interest']} tagType='interest' />
                            </div>
                        </div>
                        <UserCard userId={project.authorId} pageTitle='Project Owner' />
                    </div>
                    <h2 className='text-4xl m-2 p-10'>Collaborators</h2>
                    {collaboratorsInProject &&
                        <UserTable
                            users={collaboratorsInProject}
                            onPreviousPage={collaboratorsPreviousPage}
                            onNextPage={collaboratorsNextPage} />
                    }
                    <h2 className='text-4xl m-2 p-10'>Suggested Collaborators</h2>
                    {recommendedUsersForProject &&
                        <UserTable
                            users={recommendedUsersForProject}
                            onInvite={handleInvite}
                            onPreviousPage={recommendedUsersNextPage}
                            onNextPage={recommendedUsersPreviousPage} />
                    }
                </div>
            </div>
        </div >
        </>);
}