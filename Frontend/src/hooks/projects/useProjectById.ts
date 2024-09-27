import { useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from "../../api";
import { ProjectPatch } from '../../types';

export function useProjectById(projectId: number) {
    const queryKey = ["project", "byId", projectId];
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            if (!projectId) return;
            return await endpoints.projects.getProject(projectId);
        },
        refetchInterval: 3000
    });

    const patchProject = async (projectPatch: ProjectPatch) => {
        if (!query.data?.authorId || !query.data?.id) return;

        const patchRequest: ProjectPatch = {
            ...projectPatch,
        };

        const project = await endpoints.projects.updateProject(patchRequest, projectId, query.data.authorId);

        queryClient.setQueryData(queryKey, project);
    }

    return {
        projectById: query.data,
        patchProject
    }
}