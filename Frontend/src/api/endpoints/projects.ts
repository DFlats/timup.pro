import { client } from '../client'
import { mapRawProjectResponseToProject, ProjectPatchRequest, ProjectRequest } from '../types/projects';

export const getProjects = async (skillTags: string[] = [], interestTags: string[] = [], page?: number) => {
    const { response, data, error } = await client.GET('/api/Projects/GetProjects', {
        params: {
            query: {
                interests: interestTags,
                skills: skillTags,
                page
            }
        }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data.map(projectResponse => mapRawProjectResponseToProject(projectResponse));
}

export const getRecommendedProjectsByUserId = async (userId: string, page?: number) => {
    const { response, data, error } = await client.GET('/api/Projects/GetRecommendedProjectsByUserId/{id}', {
        params: {
            path: {
                id: userId
            },
            query: {
                page
            }

        }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data.map(projectResponse => mapRawProjectResponseToProject(projectResponse))
}

export const getProjectByProjectId = async (projectId: number) => {
    const { response, data, error } = await client.GET('/api/Projects/GetProjectByProjectId/{id}', {
        params: {
            path: {
                id: projectId
            }
        }
    });

    if (!data || (!response.ok && error))
        throw error;

    return mapRawProjectResponseToProject(data);
}

export const getProjectsByUserId = async (userId: string) => {
    const { response, data, error } = await client.GET('/api/Projects/GetProjectsByUserId/{id}', {
        params: {
            path: {
                id: userId
            }
        }
    })

    if (!data || (!response.ok && error))
        throw error;

    return data.map(projectResponse => mapRawProjectResponseToProject(projectResponse))
}

export const createProject = async (projectRequest: ProjectRequest) => {
    const { response, data, error } = await client.POST('/api/Projects/CreateProject', {
        body: projectRequest
    });

    if (!data || (!response.ok && error))
        throw error;

    return mapRawProjectResponseToProject(data);
}

export const updateProject = async (projectPatchRequest: ProjectPatchRequest) => {
    const { response, error } = await client.PATCH('/api/Projects/UpdateProject', {
        body: projectPatchRequest
    });

    if (!response.ok && error)
        throw error;
}

export const deleteProject = async (authorId: string, projectId: number) => {
    const { response, error } = await client.DELETE('/api/Projects/DeleteProject/{authorId}/{projectId}', {
        params: {
            path: {
                authorId,
                projectId
            }
        }
    });

    if (!response.ok && error)
        throw error;
}