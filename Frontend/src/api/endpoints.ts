import { paths } from './schema';
import createClient from "openapi-fetch";
import { Project, User, TagRequest } from './types';

const client = createClient<paths>({ baseUrl: 'http://localhost:5055' });


export const getProjects = async (skillTags?: string[], interestTags?: string[]): Promise<Project[]> => {
    const response = await client.GET('/api/Projects', {
        params: {
            query: {
                interests: interestTags ?? [],
                skills: skillTags ?? []
            }
        }
    })

    return response.data as Project[];
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