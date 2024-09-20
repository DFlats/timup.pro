import { client } from "../client";
import { User, mapUserResponseToUser, UserRequest, UserPatchRequest } from "../types";

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
