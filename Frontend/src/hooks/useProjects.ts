import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useClientUser } from "../hooks"
import { getProjectByProjectId, getProjects, getProjectsByUserId, createProject, Project } from "../api"
import { ProjectFeedType } from "../types/types";

export function useProjects(projectFeed: ProjectFeedType, projectId?: number) {
    const { clientUser } = useClientUser();
    const queryClient = useQueryClient();

    const queryKeyFeaturedProjects = ['projects', 'featured'];
    const queryKeyRecommendedProjects = ['projects', 'recommended'];
    const queryKeyUserProjects = ['projects', 'user'];
    const queryKeyProject = ["project", projectId];

    const featuredProjectsQuery = useQuery({
        queryKey: queryKeyFeaturedProjects,
        queryFn: async () => {
            return await getProjects();
        },
        enabled: projectFeed == 'featured'
    });

    const recommendedProjectsQuery = useQuery({
        queryKey: queryKeyRecommendedProjects,
        queryFn: async (): Promise<Project[]> => {
            if (!clientUser) return [];

            return await getProjects(clientUser.skillTags, clientUser.interestTags);
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
            return await getProjectByProjectId(projectId);
        },
        enabled: !!projectId,
        staleTime: Infinity,
    });

    const createProjectInHook = async (
        title: string,
        description: string,
        authorId: string
    ) => {
        const project = await createProject({ title, description, authorId });
        const existingProjects = userProjectsQuery.data as Project[];
        queryClient.setQueryData(queryKeyUserProjects, [...existingProjects, project]);
        return project;
    };

    const projects = () => {
        switch (projectFeed) {
            case 'featured': return featuredProjectsQuery.data as Project[];
            case 'recommended': return recommendedProjectsQuery.data as Project[];
            case 'user': return userProjectsQuery.data as Project[];
        }
    }

    return {
        projects: projects(),
        project: projectQuery.data as Project,
        createProject: createProjectInHook
    }

}