import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";

export function useUserById(userId: string) {
    const queryKey = ["users", "byId", userId];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            return await endpoints.users.getUserByUserId(userId!);
        }
    });

    return {
        userById: query.data
    }
}