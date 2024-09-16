import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tag, User } from "../api/types";

export default function useClientUser() {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const queryKey = ['clientUser'];

    const clientUserQuery = useQuery({
        queryKey,
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
    });

    const getTags = () => {
        console.log(clientUserQuery.data?.tags ?? [] as Tag[]);
        return clientUserQuery.data?.tags ?? [] as Tag[]
    }

    const addTag = (tag: Tag) => {
        const clientUser = clientUserQuery.data;

        if (!clientUser) return;

        const newClientUser: User = {
            ...clientUser,
            tags: [...getTags(), tag]
        };

        console.log(newClientUser);
        queryClient.setQueryData(queryKey, newClientUser);
    };

    const removeTag = (tag: Tag) => {
        queryClient.setQueryData(queryKey, getTags().filter(t => t.tagValue != tag.tagValue));
    }

    return {
        clientUser: clientUserQuery.data,
        addTag,
        removeTag
    }
}