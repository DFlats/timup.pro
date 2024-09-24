import { Tag, User, UserCore, UserPatch } from "../../types";
import { client } from "../client";
import { components } from "../schema";

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
    const { response, data, error } = await client.GET("/api/Users/GetRecommendedUsers/{projectId}", {
        params: {
            path: {
                projectId
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

export const getUserByUserId = async (userId: string) => {
    const { response, data, error } = await client.GET("/api/Users/GetUser/{userId}", {
        params: { path: { userId } }
    });

    if (!data || (!response.ok && error))
        throw error;

    return userFromUserResponse(data);
}

export const confirmUserExists = async (userCore: UserCore) => {
    const request = {
        clerkId: userCore.id,
        name: userCore.name,
        email: userCore.email,
    } as components['schemas']['UserRequest']

    await client.POST('/api/Users/ConfirmUserExists', {
        body: request
    });

    return await getUserByUserId(userCore.id);
}

export const updateUser = async (userPatch: UserPatch, userId: string) => {
    const userPatchRequest = {
        clerkId: userId,
        skillTags: userPatch.tags?.['skill']?.map(t => t.title),
        interestTags: userPatch.tags?.['interest']?.map(t => t.title),
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

const tagsFrom = (skillTags?: string[], interestTags?: string[]) => ({
    'skill': skillTags?.map(tag => ({ title: tag, kind: 'skill' } as Tag)) ?? [],
    'interest': interestTags?.map(tag => ({ title: tag, kind: 'skill' } as Tag)) ?? []
});

export function userFromUserResponse(dto: components['schemas']['UserResponse']) {
    return {
        id: dto.id!,
        name: dto.name!,
        email: dto.email!,
        tags: tagsFrom(dto.skillTags, dto.interestTags)
    } as User;
}