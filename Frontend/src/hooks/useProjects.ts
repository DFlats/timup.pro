import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useClientUser } from "../hooks"
import { getProjectById, getProjectsByFilter, getProjectsByUserId, postProject, Project } from "../api"
import { ProjectFeedType } from "../types/types";

export function useProjects(projectFeed: ProjectFeedType, projectId?: number) {
    const { clientUser } = useClientUser();
    const queryClient = useQueryClient();

    const queryKeyFeaturedProjects = ['featuredProjects'];
    const queryKeyRecommendedProjects = ['recommendedProjects'];
    const queryKeyUserProjects = ["userProjects"];
    const queryKeyProject = ["project", projectId];

    const featuredProjectsQuery = useQuery({
        queryKey: queryKeyFeaturedProjects,
        queryFn: async () => {
            return await getProjectsByFilter();
        },
        enabled: projectFeed == 'featured'
    });

    const recommendedProjectsQuery = useQuery({
        queryKey: queryKeyRecommendedProjects,
        queryFn: async (): Promise<Project[]> => {
            if (!clientUser) return [];

            return await getProjectsByFilter(clientUser.skillTags, clientUser.interestTags);
        },
        enabled: !!clientUser && projectFeed == 'recommended'
    });

    const userProjectsQuery = useQuery({
        queryKey: queryKeyUserProjects,
        queryFn: async () => {
            if (!clientUser) return;
            return await getProjectsByUserId(clientUser.id);
        },
        enabled: !!clientUser && projectFeed == 'user'
    });

    const projectQuery = useQuery({
        queryKey: queryKeyProject,
        queryFn: async () => {
            if (!projectId) return;
            return await getProjectById(projectId);
        },
        enabled: !!projectId,
        staleTime: Infinity,
    });

    const createProject = async (
        title: string,
        description: string,
        authorId: string
    ) => {
        const project = await postProject({ title, description, authorId });
        const existingProjects = userProjectsQuery.data as Project[];
        queryClient.setQueryData(queryKeyUserProjects, [...existingProjects, project]);
        return project;
    };

    switch (projectFeed) {
        case 'featured':
            return {
                projects: featuredProjectsQuery.data as Project[]
            }
        case 'recommended':
            return {
                projects: recommendedProjectsQuery.data as Project[]
            }
        case 'user':
            return {
                projects: userProjectsQuery.data as Project[],
                project: projectQuery.data as Project,
                createProject
            }
    }
}