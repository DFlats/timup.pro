import { useQuery } from "@tanstack/react-query";
import { getUserByUserId } from "../api";

export function useUser(userId: string) {
    const queryKeyUser = ["user", userId];

    const userQuery = useQuery({
        queryKey: queryKeyUser,
        queryFn: async () => {
            return await getUserByUserId(userId);
        },
    });

    return {
        user: userQuery.data
    }
}