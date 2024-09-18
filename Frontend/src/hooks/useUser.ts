import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api";

export function useUser(userId: string) {
    const queryKeyUser = ["user", userId];

    const userQuery = useQuery({
        queryKey: queryKeyUser,
        queryFn: async () => {
            return await getUserById(userId);
        },
    });

    return {
        user: userQuery.data
    }
}