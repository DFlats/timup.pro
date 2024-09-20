import { useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, ProjectPatchRequest, patchProject as patchProjectResponse } from "../../api";

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

    type FixedPatchRequest = Omit<ProjectPatchRequest, 'authorId' | 'projectId'>;

    const patchProject = async (projectPatch: FixedPatchRequest) => {
        if (!query.data?.authorId || !query.data?.id) return;

        const patchRequest: ProjectPatchRequest = {
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