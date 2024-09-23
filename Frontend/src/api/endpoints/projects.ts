import { client } from '../client'
import { components } from '../schema';
import { Project, ProjectCore, ProjectPatch, UserIdName } from '../../types/projects';
import { Tag } from '../../types';

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
    const { response, data, error } = await client.GET('/api/Projects/GetRecommendedProjects/{userId}', {
        params: {
            path: {
                userId
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
    const { response, data, error } = await client.GET("/api/Projects/GetProject/{projectId}", {
        params: {
            path: {
                projectId
            }
        }
    });

    if (!data || (!response.ok && error))
        throw error;

    return projectFromProjectResponse(data);
}

//!!! Endpoint returns ProjectOverviewResponse
export const getProjectsByUserId = async (userId: string) => {
    const { response, data, error } = await client.GET('/api/Projects/GetOwnedProjects/{userId}', {
        params: {
            path: {
                userId
            }
        }
    })

    if (!data || (!response.ok && error))
        throw error;

    return data.map(projectResponse => projectFromProjectResponse(projectResponse))
}

export const createProject = async (projectCore: ProjectCore) => {
    const requestBody = {
        authorId: projectCore.authorId,
        description: projectCore.description,
        title: projectCore.title
    } as components['schemas']['ProjectRequest'];

    const { response, data, error } = await client.POST('/api/Projects/CreateProject', {
        body: requestBody
    });

    if (!data || (!response.ok && error))
        throw error;

    return projectFromProjectResponse(data);
}

export const updateProject = async (projectPatch: ProjectPatch, projectId: number, authorId: string) => {
    const projectPatchRequest = {
        ...projectPatch,
        projectId,
        authorId,
    } as components['schemas']['ProjectPatchRequest']

    const { response, error } = await client.PATCH('/api/Projects/UpdateProject', {
        body: projectPatchRequest
    });

    if (!response.ok && error)
        throw error;

    return await getProjectByProjectId(projectId);
}

export const deleteProject = async (projectId: number) => {
    const { response, error } = await client.DELETE('/api/Projects/DeleteProject/{projectId}', {
        params: {
            path: {
                projectId
            }
        }
    });

    if (!response.ok && error)
        throw error;
}

const tagsFrom = (skillTags?: string[], interestTags?: string[]) => ({
    'skill': skillTags?.map(tag => ({ title: tag, kind: 'skill' } as Tag)) ?? [],
    'interest': interestTags?.map(tag => ({ title: tag, kind: 'skill' } as Tag)) ?? []
});

const collaboratorsFrom = (collaborators: components['schemas']['CollaboratorsResponse'][]) =>
    collaborators!.map(dto => {
        const collab: UserIdName = {};
        collab[dto.clerkId!] = dto.name!;
        return collab;
    });

function projectFromProjectResponse(dto: components['schemas']['ProjectResponse']) {
    return {
        authorId: dto.authorId!,
        title: dto.title!,
        description: dto.description!,
        id: dto.id!,
        authorName: dto.authorName!,
        collaborators: collaboratorsFrom(dto.collaborators!),
        tags: tagsFrom(dto.skillTags, dto.interestTags!),
        isCompleted: dto.isCompleted!,
        invitedUsersIds: dto.invitedUsers!
    } as Project;
}
