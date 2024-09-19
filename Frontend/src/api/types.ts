import { components } from './schema';

export type Project = Required<components['schemas']['ProjectResponse']>
export type ProjectRequest = Required<components['schemas']['ProjectRequest']>
export type ProjectOverviewResponse = Required<components['schemas']['ProjectOverviewResponse']>
export type ProjectPatchRequest = components['schemas']['ProjectPatchRequest'];

export type TagRequest = Required<components['schemas']['TagRequest']>

export type User = Required<components['schemas']['UserResponse']>
export type UserRequest = Required<components['schemas']['UserRequest']>
export type UserPatchRequest = components['schemas']['UserPatchRequest'];

export type IdName = Required<components['schemas']['ValueTupleOfStringAndString']>
