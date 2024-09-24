/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useProjectById } from "../../hooks/projects";
import { NotFound } from "../routing";
import { UserTable } from "../users";
import { TagContainer } from "../tags";
import { useCollaborators } from "../../hooks/users/useCollaborators";
import { useRecommendedUsersForProject } from "../../hooks/users";
import { useTransactions } from "../../hooks";
import { Tags, TagType } from "../../types";

export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const projectId = Number.parseInt(Route.useParams().id);

    const { projectById: project } = useProjectById(projectId);
    const { collaboratorsInProject } = useCollaborators(projectId);
    const { recommendedUsersForProject } = useRecommendedUsersForProject(projectId);
    const { inviteUserToProjectRequest } = useTransactions();

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
        'interest': project.tags['skill'].map(projectTag => ({
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
            className="hero min-h-screen" >
            <div className="hero-overlay bg-opacity-95"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-screen-lg">
                    <h1 className="text-5xl font-bold">{project.title}</h1>
                    <p className="py-6">{project.description}</p>
                    <TagContainer tags={projectTags['skill']} tagType='skill' />
                    <TagContainer tags={projectTags['interest']} tagType='interest' />
                    <h2 className='text-2xl m-2'>Collaborators</h2>
                    {collaboratorsInProject &&
                        <UserTable
                            users={collaboratorsInProject} />
                    }
                    <h2 className='text-2xl m-2'>Suggested Collaborators</h2>
                    {recommendedUsersForProject &&
                        <UserTable
                            users={recommendedUsersForProject}
                            onInvite={handleInvite} />
                    }
                </div>
            </div>
        </div >
        </>);
}