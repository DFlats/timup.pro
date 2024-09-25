import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { User } from "../../types"
import { useState } from "react"

export function useRecommendedUsersForProject(projectId: number) {
    const [currentPage, setCurrentPage] = useState(1);
    const queryKey = ['users', 'recommendedForProject', projectId, 'page', currentPage];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const project = await endpoints.projects.getProject(projectId);
            const batch = await endpoints.users.getRecommendedUsersByProjectId(projectId!, currentPage);

            batch.users = batch.users.map(user => ({
                ...user,
                tags: {
                    'skill': user.tags['skill']
                        .filter(tag => project.tags['skill']
                            .map(projectTag => projectTag.title).includes(tag.title)),
                    'interest': user.tags['interest']
                        .filter(tag => project.tags['interest']
                            .map(projectTag => projectTag.title).includes(tag.title)),
                }
            } as User));

            return batch;
        }
    });

    const nextPage = () => {
        if (query.data?.nextPage) {
            setCurrentPage(currentPage => currentPage + 1);
            console.log(`Next page ${currentPage + 1}`);
        }
    }

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage => currentPage - 1);
            console.log(`Previous page ${currentPage - 1}`);
        }
    }

    const inviteSuggestedUser = async (userId: string) => {
        await endpoints.transactions.inviteUserToProject(userId, projectId);
        console.log('invite');
    }

    return {
        recommendedUsersForProject: query.data?.users,
        recommendedUsersPreviousPage: nextPage,
        recommendedUsersNextPage: previousPage,
        inviteSuggestedUser
    }
}