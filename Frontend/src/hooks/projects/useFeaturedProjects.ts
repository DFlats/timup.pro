import { useInfiniteQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";

export function useFeaturedProjects() {
    const queryKey = ['projects', 'featured'];

    const { data, fetchNextPage } = useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam }) => {
            if (!pageParam) return;
            const projectBatch = await endpoints.projects.getProjects([], [], pageParam);
            return projectBatch;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage!.nextPage,
    })

    return {
        featuredProjects: data?.pages.filter(page => page != undefined).map(page => page?.projects).flat(),
        fetchNextPage
    }
}