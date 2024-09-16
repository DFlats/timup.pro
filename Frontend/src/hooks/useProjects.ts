import { Project } from "../api/types"

export default function useProjects() {
    const projects: Project[] = Array(5).fill(
        {
            id: 0,
            title: "Book Club",
            description: { id: 0, text: "We meet and discuss heavy literature" },
            author: { clerkId: '0', name: "Benjamin Buttons", email: "Arbe@fjksl.com" },
            authorId: '0',
            collaborators: [],
            progress: { id: 0, isCompleted: false }
        });

    return {
        projects
    }
}