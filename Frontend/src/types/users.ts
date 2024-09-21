import { Tags } from './tags';

export type UserCore = {
    id: string;
    name: string;
    email: string;
}

export type User = UserCore & {
    interestTags: string[];
    skillTags: string[];
    tags: Tags
}

export type UserPatch = {
    id: string;
    tags?: Tags
}