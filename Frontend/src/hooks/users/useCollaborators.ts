import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { User } from "../../types";

export function useCollaborators(projectId: number) {
    const queryKey = ['users', 'collaborators', 'forProjectId', projectId];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const project = await endpoints.projects.getProject(projectId);
            const collaboratorIds = project.collaborators.map(collaborator =>
                Object.getOwnPropertyNames(collaborator)[0]);
            let collaborators = await Promise.all(collaboratorIds.map(async (id) => await endpoints.users.getUserByUserId(id)));

            collaborators = collaborators.map(collaborator => ({
                ...collaborator,
                tags: {
                    'skill': collaborator.tags['skill']
                        .filter(tag => project.tags['skill']
                            .map(projectTag => projectTag.title).includes(tag.title)),
                    'interest': collaborator.tags['interest']
                        .filter(tag => project.tags['interest']
                            .map(projectTag => projectTag.title).includes(tag.title)),
                }
            } as User));

            return collaborators;
        }
    });

    return {
        collaboratorsInProject: query.data
    }
}