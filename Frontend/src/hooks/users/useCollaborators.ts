import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";

export function useCollaborators(projectId: number) {
    const queryKey = ['users', 'collaborators', 'forProjectId', projectId];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const project = await endpoints.projects.getProject(projectId);
            const collaboratorIds = project.collaborators.map(collaborator =>
                Object.getOwnPropertyNames(collaborator)[0]);
            const collaborators = await Promise.all(collaboratorIds.map(async (id) => await endpoints.users.getUserByUserId(id)))
            return collaborators;
        }
    });

    return {
        collaboratorsInProject: query.data
    }
}