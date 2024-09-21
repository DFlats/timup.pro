import { TagType } from './misc';

export type UserCore = {
    id: string;
    name: string;
    email: string;
}

export type User = UserCore & {
    interestTags: string[];
    skillTags: string[];
    tags: Record<TagType, string[]>
}

export type UserPatch = {
    id: string;
    skillTags?: string[];
    interestTags?: string[];
}