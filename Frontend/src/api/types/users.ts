import { components } from '../schema';

// components['schemas']['UserResponse']
export type User = {
    id: string;
    name: string;
    email: string;
    interestTags: string[];
    skillTags: string[];
}

// components['schemas']['UserRequest']
export type UserRequest = {
    clerkId: string;
    name: string;
    email: string;
}

// components['schemas']['UserPatchRequest'];
export type UserPatchRequest = {
    clerkId: string;
    skillTags?: string[];
    interestTags?: string[];
}

export function mapUserResponseToUser(userResponse: components['schemas']['UserResponse']) {
    return {
        id: userResponse.id!,
        name: userResponse.name!,
        email: userResponse.email!,
        interestTags: userResponse.interestTags!,
        skillTags: userResponse.skillTags!
    } as User;
}

export function userFromUserPatchRequest(user: User, patch: UserPatchRequest) {
    const patchedUser: User = {
        ...user,
        ...patch
    };
    return patchedUser;
}