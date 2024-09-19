import { paths } from './schema';
import createClient from "openapi-fetch";
import { Project, User, TagRequest, ProjectRequest, UserRequest } from './types';

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

export const postProject = async (projectRequest: ProjectRequest) => {
   const response =  await client.POST('/api/Projects', {
        body: projectRequest
    });

    if(!response.data) throw new Error("Response data does not exist");
    
    return response.data;
}

export const getRecommendedProjectsByUserId = async (userId: string) => {
    const response = await client.GET('/api/Projects/RecommendedProjects/{userId}', {
        params: {
            path: {
                userId
            }
        }
    });

    if (!response.data) {
        throw new Error(response.error);
    }
    return response.data as Project[];
}

export const getProjectById = async (projectId: number) => {
    const response = await client.GET('/api/Projects/{id}', {
        params: {
            path: {
                id: projectId
            }
        }
    });

    if (!response.data) {
        throw new Error('getProjectsById: No data');
    }

    console.log(response.data)

    return response.data as Project;
}

export const getProjectsByUserId = async (userId: string) => {
    const response = await client.GET('/api/Projects/ProjectsByUserId/id', {
        params: {
            query: {
                id: userId
            }
        }
    })

    if (!response.data) {
        throw new Error(response.error);
    }

    return response.data as Project[];
}

export const getUserById = async (id: string): Promise<User> => {
    const response = await client.GET('/api/Users/{id}', {
        params: { path: { id } }
    });

    if (!response.data) {
        throw new Error(response.error);
    }

    return response.data as User;
}

export const postUser = async (userRequest: UserRequest) => {
    await client.POST('/api/Users', {
        body: userRequest
    });
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

export const recommendedUsersByProjectId = async (projectId: number) => {
    const response = await client.GET('/api/Users/RecommendedUsers/{projectId}', {
        params: {
            path: {
                projectId
            }
        }
    });

    if (!response.data) {
        throw new Error(response.error);
    }

    return response.data as User[];
}