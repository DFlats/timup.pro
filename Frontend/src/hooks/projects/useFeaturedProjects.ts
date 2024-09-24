import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";

export function useFeaturedProjects() {
    const queryKey = ['projects', 'featured'];

    const featuredProjectsQuery = useQuery({
        queryKey,
        queryFn: async () => {
            return (await endpoints.projects.getProjects([], [], 1)).projects;
        }
    });

    return {
        featuredProjects: featuredProjectsQuery.data
    }
}