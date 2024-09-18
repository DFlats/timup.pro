import { useQuery } from "@tanstack/react-query";
import { Project } from "../api/types"
import { useClientUser } from "./useClientUser";

export function useProjects() {
    const { clientUser } = useClientUser();

    if (!clientUser?.tags) {
        const { data, error } = useQuery({
            queryKey: ['hotprojects'],
            queryFn: async () => {

                //fetch projects from backend instead 

                const projects: Project[] = Array(5).fill(
                    {
                        id: 0,
                        title: "Web Site",
                        description: {
                            id: 0, text: "We build a website", tags: [
                                { id: 0, tagValue: "CSS", projects: [] },
                                { id: 1, tagValue: "HTML", projects: [] },
                                { id: 2, tagValue: "JavaScript", projects: [] }
                            ]
                        },
                        author: { clerkId: '0', name: "Charles Darwin", email: "charles@email.com" },
                        authorId: '0',
                        collaborators: [],
                        progress: { id: 0, isCompleted: false }
                    });

                return projects
            },
        });

        return {
            projects: data,
            error
        }
    }

    const { data, error } = useQuery({
        queryKey: ['tailoredprojects'],
        queryFn: async () => {

            //fetch filtered projects from backend instead 

            const projects: Project[] = Array(5).fill(
                {
                    id: 0,
                    title: "Book Club",
                    description: {
                        id: 0, text: "We meet and discuss heavy literature", tags: [
                            { id: 0, tagValue: "Literature", projects: [] },
                            { id: 1, tagValue: "Politics", projects: [] },
                            { id: 2, tagValue: "Debate", projects: [] }
                        ]
                    },
                    author: { clerkId: '0', name: "Benjamin Buttons", email: "Arbe@fjksl.com" },
                    authorId: '0',
                    collaborators: [],
                    progress: { id: 0, isCompleted: false }
                });

            return projects
        },
    });

    return {
        projects: data,
        error
    }

}