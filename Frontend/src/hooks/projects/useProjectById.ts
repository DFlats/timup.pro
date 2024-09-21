import { useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, ProjectPatch, patchProject as patchProjectResponse } from "../../api";

export function useProjectById(projectId: number) {
    const queryKey = ["project", "byId", projectId];
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            if (!projectId) return;
            return await endpoints.projects.getProjectByProjectId(projectId);
        }
    });

    type FixedPatchRequest = Omit<ProjectPatch, 'authorId' | 'projectId'>;

    const patchProject = async (projectPatch: FixedPatchRequest) => {
        if (!query.data?.authorId || !query.data?.id) return;

        const patchRequest: ProjectPatch = {
            ...projectPatch,
            authorId: query.data.authorId,
            projectId: query.data.id
        };

        await endpoints.projects.updateProject(patchRequest);

        queryClient.setQueryData(queryKey, patchProjectResponse(query.data, patchRequest))
    }

    return {
        projectById: query.data,
        patchProject
    }
}