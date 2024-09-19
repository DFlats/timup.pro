import { paths } from './schema';
import createClient from "openapi-fetch";
import { Project, User, TagRequest, ProjectRequest, UserRequest } from './types';

const client = createClient<paths>({ baseUrl: 'http://localhost:5055' });

export const getProjects = async (skillTags?: string[], interestTags?: string[]): Promise<Project[]> => {
    const response = await client.GET('/api/Projects/GetProjects', {
        params: {
            query: {
                interests: interestTags ?? [],
                skills: skillTags ?? []
            }
        }
    });

    return response.data as Project[];
}

export const createProject = async (projectRequest: ProjectRequest) => {
    const response = await client.POST('/api/Projects/CreateProject', {
        body: projectRequest
    });

    if (!response.data) throw new Error("Response data does not exist");

    return response.data as Project;
}

export const getRecommendedProjectsByUserId = async (userId: string) => {
    const response = await client.GET('/api/Projects/GetProjectsByUserId/{id}', {
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

export const getProjectByProjectId = async (projectId: number) => {
    const response = await client.GET('/api/Projects/GetProjectByProjectId/{id}', {
        params: {
            path: {
                id: projectId
            }
        }
    });

    if (!response.data) {
        throw new Error('getProjectsById: No data');
    }

    return response.data as Project;
}

export const getProjectsByUserId = async (userId: string) => {
    const response = await client.GET('/api/Projects/GetProjectsByUserId/{id}', {
        params: {
            path: {
                id: userId
            }
        }
    })

    if (!response.data) {
        throw new Error(response.error);
    }

    return response.data as Project[];
}

export const updateProject = async () => {
    return;
}

export const getUserByUserId = async (id: string): Promise<User> => {
    const response = await client.GET('/api/Users/GetUserByUserId/{id}', {
        params: { path: { id } }
    });

    if (!response.data) {
        throw new Error(response.error);
    }

    return response.data as User;
}

export const createUser = async (userRequest: UserRequest) => {
    await client.POST('/api/Users/CreateUser', {
        body: userRequest
    });
}

export const addTagToUserByUserId = async (id: string, tagRequest: TagRequest) => {
    await client.POST('/api/Users/AddTagToUserByUserId/{id}', {
        params: { path: { id } },
        body: tagRequest
    })
}

export const removeTagFromUserByUserId = async (id: string, tagRequest: TagRequest) => {
    await client.DELETE('/api/Users/RemoveTagFromUserByUserId/{id}', {
        params: {
            path: {
                id
            }
        },
        body: tagRequest
    });
}

export const getRecommendedUsersByProjectId = async (projectId: number) => {
    const response = await client.GET('/api/Users/GetRecommendedUsersByProjectId/{id}', {
        params: {
            path: {
                id: projectId
            }
        }
    });

    if (!response.data) {
        throw new Error(response.error);
    }
    console.log(response.data)
    return response.data as User[];
}

export const updateUser = async () => {
    return;
}

