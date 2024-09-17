import { User } from "../api/types"

export default function useUsers() {
    const users: User[] = Array(5).fill(
        {
            clerkId: 0,
            name: "Bengt",
            email: "bengt@email.com",
            projects: [],
            tags: [
                { id: 0, tagValue: "Java", projects: [] },
                { id: 1, tagValue: "C++", projects: [] },
                { id: 2, tagValue: "Python", projects: [] }
            ],
        });

    return {
        users
    }
}