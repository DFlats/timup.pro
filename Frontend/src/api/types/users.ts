import { components } from '../schema';

export type UserCore = {
    id: string;
    name: string;
    email: string;
}

export type User = UserCore & {
    interestTags: string[];
    skillTags: string[];
}

export type UserPatch = {
    id: string;
    skillTags?: string[];
    interestTags?: string[];
}

export function userFromUserResponse(dto: components['schemas']['UserResponse']) {
    return {
        id: dto.id!,
        name: dto.name!,
        email: dto.email!,
        interestTags: dto.interestTags!,
        skillTags: dto.skillTags!
    } as User;
}

export function patchUser(user: User, patch: UserPatch) {
    const patchedUser: User = {
        ...user,
        ...patch
    };
    return patchedUser;
}