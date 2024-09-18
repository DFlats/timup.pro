import { components } from './schema';

export type ProjectFilter = Required<components['schemas']['ProjectFilter']>
export type ProjectResponse = Required<components['schemas']['ProjectResponse']>
export type TagRequest = Required<components['schemas']['TagRequest']>
export type UserResponse = Required<components['schemas']['UserResponse']>
export type ValueTupleOfStringAndString = Required<components['schemas']['ValueTupleOfStringAndString']>

export type Project = {
    id: number,
    title: string,
    author: User,
    authorId: string,
    collaborators: User[],
    description: Description,
    progress?: Progress
};

export type User = {
    clerkId: string,
    name: string,
    email: string,
    projects?: Project[],
    tags?: Tag[],
    location?: google.maps.LatLngLiteral,
    imageUrl?: string
};

export type Tag = {
    id: number,
    tagValue: string,
    projects?: Project[]
};

export type Progress = {
    id: number,
    isCompleted: boolean
};

export type Description = {
    id: number,
    tags?: Tag[],
    text: string
};