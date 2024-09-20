import { client } from "../client";
import { User, mapUserResponseToUser, UserRequest, UserPatchRequest } from "../types";

export const getUsers = async (skillTags: string[] = [], interestTags: string[] = [], page?: number) => {
    const { response, data, error } = await client.GET('/api/Users/GetUsers', {
        params: {
            query: {
                skills: skillTags,
                interests: interestTags,
                page,
            }
        }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data.map(userResponse => mapUserResponseToUser(userResponse)) as User[];
}

export const getRecommendedUsersByProjectId = async (projectId: number, page: number) => {
    const { response, data, error } = await client.GET('/api/Users/GetRecommendedUsersByProjectId/{id}', {
        params: {
            path: {
                id: projectId
            },
            query: {
                page
            }
        }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data.map(userResponse => mapUserResponseToUser(userResponse));
}

export const getUserByUserId = async (id: string) => {
    const { response, data, error } = await client.GET('/api/Users/GetUserByUserId/{id}', {
        params: { path: { id } }
    });

    if (!data || (!response.ok && error))
        throw error;

    return mapUserResponseToUser(data);
}

export const createUser = async (userRequest: UserRequest) => {
    const { response, error } = await client.POST('/api/Users/CreateUser', {
        body: userRequest
    });

    if (!response.ok && error)
        throw error;
}

export const updateUser = async (userPatchRequest: UserPatchRequest) => {
    const { response, error } = await client.PATCH('/api/Users/UpdateUser', {
        body: userPatchRequest
    });

    if (!response.ok && error)
        throw error;
}

export const deleteUser = async (userId: string) => {
    const { response, error } = await client.DELETE('/api/Users/DeleteUser/{userId}', {
        params: {
            path: {
                userId
            }
        }
    });

    if (!response.ok && error)
        throw error;
}
