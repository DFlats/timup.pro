import { components } from './schema';

// components['schemas']['ProjectResponse']
export type Project = {
    id: number;
    title: string;
    authorName: string;
    authorId: string;
    collaborators: IdName[]
    description: string;
    skillTags: string[];
    interestTags: string[];
    isCompleted: boolean;
}

// components['schemas']['ProjectRequest']
export type ProjectRequest = {
    authorId: string;
    title: string;
    description: string;
}

// components['schemas']['ProjectOverviewResponse']
export type ProjectOverviewResponse = {
    id: number;
    title: string;
    authorId: string;
    collabCount: number;
    description: string;
    skillTags: string[];
    interestTags: string[];
    isCompleted: boolean;
}

// components['schemas']['ProjectOverviewResponse']
export type ProjectPatchRequest = {
    projectId: number;
    authorId: string;
    title?: string;
    description?: string;
    skillTags?: string[];
    interestTags?: string[];
    isCompleted?: boolean;
}

// components['schemas']['TagRequest']
export type TagRequest = {
    tagName: string;
    isSkill: boolean;
}

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

export type IdName = Required<components['schemas']['ValueTupleOfStringAndString']>