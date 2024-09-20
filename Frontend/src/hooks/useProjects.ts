import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useUsers } from "../hooks"
import { getProjectByProjectId, getProjects, getProjectsByUserId, createProject, ProjectResponse } from "../api"

type FeaturedProjects = {
    type: 'featuredProjects'
};

type RecommendedProjectsForClientUser = {
    type: 'recommendedProjectsForClientUser',
}

type ProjectsOwnedByClientUser = {
    type: 'projectsOwnedByClientUser'
}

type ProjectById = {
    type: 'projectById',
    projectId: number
}

type Params =
    FeaturedProjects |
    RecommendedProjectsForClientUser |
    ProjectsOwnedByClientUser |
    ProjectById;

export function useProjects(params: Params) {
    const { clientUser } = useUsers({ type: 'clientUser' })
    const queryClient = useQueryClient();

    const projectId = params.type == 'projectById' && params.projectId;
    const queryKeyFeaturedProjects = ['projects', 'featured'];
    const queryKeyRecommendedProjects = ['projects', 'recommended'];
    const queryKeyUserProjects = ['projects', 'user'];
    const queryKeyProject = ["project", projectId];

    const featuredProjectsQuery = useQuery({
        queryKey: queryKeyFeaturedProjects,
        queryFn: async () => {
            return await getProjects();
        },
        enabled: params.type == 'featuredProjects'
    });

    const recommendedProjectsForClientUserQuery = useQuery({
        queryKey: queryKeyRecommendedProjects,
        queryFn: async (): Promise<ProjectResponse[]> => {
            if (!clientUser) return [];

            return await getProjects(clientUser.skillTags, clientUser.interestTags);
        },
        enabled: params.type == 'recommendedProjectsForClientUser'
    });

    const projectsOwnedByClientUserQuery = useQuery({
        queryKey: queryKeyUserProjects,
        queryFn: async () => {
            if (!clientUser) return;
            return await getProjectsByUserId(clientUser.id);
        },
        enabled: params.type == 'projectsOwnedByClientUser'
    });

    const projectByIdQuery = useQuery({
        queryKey: queryKeyProject,
        queryFn: async () => {
            if (!projectId) return;
            return await getProjectByProjectId(projectId);
        },
        enabled: params.type == 'projectById'
    });

    const createProjectInHook = async (
        title: string,
        description: string,
        authorId: string
    ) => {
        const project = await createProject({ title, description, authorId });
        const existingProjects = projectsOwnedByClientUserQuery.data as ProjectResponse[];
        queryClient.setQueryData(queryKeyUserProjects, [...existingProjects, project]);
        return project;
    };

    return {
        featuredProjects: featuredProjectsQuery.data as ProjectResponse[],
        recommendedProjectsForClientUser: recommendedProjectsForClientUserQuery.data as ProjectResponse[],
        projectsOwnedByClientUser: projectsOwnedByClientUserQuery.data as ProjectResponse[],
        projectById: projectByIdQuery.data as ProjectResponse,
        createProject: createProjectInHook
    }

}