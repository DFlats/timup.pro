import { paths } from './schema';
import createClient from "openapi-fetch";
import { Project, User, TagRequest, ProjectRequest } from './types';

const client = createClient<paths>({ baseUrl: 'http://localhost:5055' });

export const getProjectsByFilter = async (skillTags?: string[], interestTags?: string[]): Promise<Project[]> => {
    const response = await client.GET('/api/Projects', {
        params: {
            query: {
                interests: interestTags ?? [],
                skills: skillTags ?? []
            }
        }
    });

    return response.data as Project[];
}

export const postProject = async (request: ProjectRequest) => {
    await client.POST('/api/Projects', {
        body: request
    });
}

export const getRecommendedProjectsByUserId = async (userId: string) => {
    const response = await client.GET('/api/Projects/Recommended/{id}', {
        params: {
            path: {
                id: userId
            }
        }
    });

    if (!response.data) {
        throw new Error(response.error);
    }
    return response.data as Project[];
}

export const getProjectById = async (id: number) => {
    console.log(getProjectById);
    const response = await client.GET('/api/Projects/{id}', {
        params: {
            path: {
                id,
            }
        }
    });

    if (!response.data) {
        throw new Error('getProjectsById: No data');
    }

    console.log(response.data)

    return response.data as Project;
}

export const getUserById = async (id: string): Promise<User> => {
    const response = await client.GET('/api/Users/{id}', {
        params: { path: { id } }
    });

    return response.data as User;
}

export const addTagToUser = async (id: string, tagRequest: TagRequest) => {
    await client.POST('/api/Users/AddTag/{id}', {
        params: { path: { id } },
        body: tagRequest
    })
}
export const removeTagFromUser = async (id: string, tagRequest: TagRequest) => {
    await client.DELETE('/api/Users/RemoveTag/{id}', {
        params: {
            path: {
                id
            }
        },
        body: tagRequest
    });
}