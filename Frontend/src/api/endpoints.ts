import createClient from "openapi-fetch";
import { components, paths } from './schema';
import { Project, User, ProjectRequest, UserRequest, UserPatchRequest, ProjectPatchRequest } from './types';

const client = createClient<paths>({ baseUrl: 'http://localhost:5055' });

const mapRawProjectResponseToProject = (projectResponse: components['schemas']['ProjectResponse']) => {
    return {
        id: projectResponse.id!,
        title: projectResponse.title!,
        authorName: projectResponse.authorName!,
        authorId: projectResponse.authorId!,
        //TODO: Figure out how NameId works
        collaborators: [],
        description: projectResponse.description!,
        skillTags: projectResponse.skillTags!,
        interestTags: projectResponse.interestTags!,
        isCompleted: projectResponse.isCompleted!
    } as Project;
}

const mapUserResponseToUser = (userResponse: components['schemas']['UserResponse']) => {
    return {
        id: userResponse.id!,
        name: userResponse.name!,
        email: userResponse.email!,
        interestTags: userResponse.interestTags!,
        skillTags: userResponse.skillTags!
    } as User;
}

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

export const getUserByUserId = async (id: string): Promise<User> => {
    const response = await client.GET('/api/Users/GetUserByUserId/{id}', {
        params: { path: { id } }
    });

    if (!response.data) {
        throw new Error(response.error);
    }

    return mapUserResponseToUser(response.data);
}

export const createUser = async (userRequest: UserRequest) => {
    await client.POST('/api/Users/CreateUser', {
        body: userRequest
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

    return response.data.map(userResponse => mapUserResponseToUser(userResponse));
}

export const updateUser = async (userPatchRequest: UserPatchRequest) => {
    await client.PATCH('/api/Users/UpdateUser', {
        body: userPatchRequest
    });
}

