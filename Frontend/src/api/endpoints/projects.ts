import { client } from '../client'
import { mapRawProjectResponseToProject, ProjectPatchRequest, ProjectRequest } from '../types/projects';

export const getProjects = async (skillTags?: string[], interestTags?: string[]) => {
    const response = await client.GET('/api/Projects/GetProjects', {
        params: {
            query: {
                interests: interestTags ?? [],
                skills: skillTags ?? []
            }
        }
    });

    if (!response.data) throw new Error(response.error);

    return response.data.map(projectResponse => mapRawProjectResponseToProject(projectResponse));
}

export const getRecommendedProjectsByUserId = async (userId: string) => {
    const response = await client.GET('/api/Projects/GetProjectsByUserId/{id}', {
        params: {
            path: {
                id: userId
            }
        }
    });

    if (!response.data) throw new Error(response.error);

    return response.data.map(projectResponse => mapRawProjectResponseToProject(projectResponse))
}

export const createProject = async (projectRequest: ProjectRequest) => {
    const response = await client.POST('/api/Projects/CreateProject', {
        body: projectRequest
    });

    if (!response.data) throw new Error(response.error);

    return mapRawProjectResponseToProject(response.data);
}

export const getProjectByProjectId = async (projectId: number) => {
    const response = await client.GET('/api/Projects/GetProjectByProjectId/{id}', {
        params: {
            path: {
                id: projectId
            }
        }
    });

    if (!response.data) throw new Error(response.error);

    return mapRawProjectResponseToProject(response.data);
}

export const getProjectsByUserId = async (userId: string) => {
    const response = await client.GET('/api/Projects/GetProjectsByUserId/{id}', {
        params: {
            path: {
                id: userId
            }
        }
    })

    if (!response.data) throw new Error(response.error);

    return response.data.map(projectResponse => mapRawProjectResponseToProject(projectResponse))
}

export const updateProject = async (projectPatchRequest: ProjectPatchRequest) => {
    await client.PATCH('/api/Projects/UpdateProject', {
        body: projectPatchRequest
    });
}