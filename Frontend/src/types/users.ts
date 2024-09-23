import { Tags } from './tags';

export type UserCore = {
    id: string;
    name: string;
    email: string;
}

export type User = UserCore & {
    tags: Tags
}

export type UserPatch = {
    id: string;
    tags?: Tags
}