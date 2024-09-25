import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { User } from "../../types";
import { useState } from "react";

export function useCollaborators(projectId: number) {
    const collaboratorsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const queryKey = ['users', 'collaborators', 'forProjectId', projectId, 'page', currentPage];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const project = await endpoints.projects.getProject(projectId);
            const collaboratorIds = project.collaborators
                .map(collaborator => Object.getOwnPropertyNames(collaborator)[0]);

            setTotalPages(Math.ceil(collaboratorIds.length / collaboratorsPerPage));

            const collaboratorIdsPage = collaboratorIds
                .slice((currentPage - 1) * collaboratorsPerPage, currentPage * collaboratorsPerPage);

            let collaborators = await Promise.all(collaboratorIdsPage.map(async (id) => await endpoints.users.getUserByUserId(id)));

            collaborators = collaborators.map(collaborator => ({
                ...collaborator,
                tags: {
                    'skill': collaborator.tags['skill']
                        .filter(tag => project.tags['skill']
                            .map(projectTag => projectTag.title).includes(tag.title)),
                    'interest': collaborator.tags['interest']
                        .filter(tag => project.tags['interest']
                            .map(projectTag => projectTag.title).includes(tag.title)),
                }
            } as User));

            return collaborators;
        }
    });

    const nextPage = () => {
        if (currentPage < totalPages) {
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

    return {
        collaboratorsInProject: query.data,
        collaboratorsPreviousPage: totalPages > 1 ? nextPage : undefined,
        collaboratorsNextPage: totalPages > 1 ? previousPage : undefined,
    }
}