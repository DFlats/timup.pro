import { client } from "../client";
import { components } from "../schema";
import { User, userFromUserResponse, UserCore, UserPatch } from "../types";

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

    return data.map(userResponse => userFromUserResponse(userResponse)) as User[];
}

export const getRecommendedUsersByProjectId = async (projectId: number, page?: number) => {
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

    return data.map(userResponse => userFromUserResponse(userResponse));
}

export const getUserByUserId = async (id: string) => {
    const { response, data, error } = await client.GET('/api/Users/GetUserByUserId/{id}', {
        params: { path: { id } }
    });

    if (!data || (!response.ok && error))
        throw error;

    return userFromUserResponse(data);
}

export const createUser = async (userCore: UserCore) => {
    await client.POST('/api/Users/CreateUser', {
        body: userCore
    });

    return await getUserByUserId(userCore.id);
}

export const updateUser = async (userPatch: UserPatch, userId: string) => {
    const userPatchRequest = {
        clerkId: userId,
        ...userPatch
    } as components['schemas']['UserPatchRequest'];

    const { response, error } = await client.PATCH('/api/Users/UpdateUser', {
        body: userPatchRequest
    });

    if (!response.ok && error)
        throw error;

    return await getUserByUserId(userId);
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
