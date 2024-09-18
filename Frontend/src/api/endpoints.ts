import { paths } from './schema';
import createClient from "openapi-fetch";
import { ProjectFilter, ProjectResponse } from './types';

const client = createClient<paths>({ baseUrl: 'http://localhost:5055' });

export const getProjects = async (filter: ProjectFilter) => {
    const response = await client.GET('/api/Projects', {
        body: filter
    })

    return response.data as ProjectResponse[];
}