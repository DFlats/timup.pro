import { client } from '../client'
import { ProjectCore, projectFromProjectOverviewResponse, projectFromProjectResponse, ProjectPatch } from '../types/projects';

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

    return data.map(projectResponse => projectFromProjectResponse(projectResponse));
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

    return data.map(projectResponse => projectFromProjectResponse(projectResponse))
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

    return projectFromProjectResponse(data);
}

//!!! Endpoint returns ProjectOverviewResponse
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

    return data.map(projectResponse => projectFromProjectOverviewResponse(projectResponse))
}

export const createProject = async (projectRequest: ProjectCore) => {
    const { response, data, error } = await client.POST('/api/Projects/CreateProject', {
        body: projectRequest
    });

    if (!data || (!response.ok && error))
        throw error;

    return projectFromProjectResponse(data);
}

export const updateProject = async (projectPatchRequest: ProjectPatch) => {
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