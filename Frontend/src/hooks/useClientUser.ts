import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../api/types";

export default function useClientUser() {
    const { user } = useUser();

    const clientUserQuery = useQuery({
        queryKey: ["clientUser"],
        queryFn: async () => {
            if (!user) return;

            //fetch full user from backend here instead

            const clientUser: User = {
                clerkId: user.id,
                name: user.fullName ?? 'John Doe',
                email: user.primaryEmailAddress?.toString() ?? 'no$@email.com',
                projects: [],
                tags: []
            }

            return clientUser;
        },
        enabled: !!user
    })

    return {
        clientUser: clientUserQuery.data
    }
}