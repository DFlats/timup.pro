import { useQuery } from "@tanstack/react-query";
import { useClientUser } from "../users";
import { endpoints } from "../../api";

export function useClientUserInvites() {
    const { clientUser } = useClientUser();
    const queryKey = ['invites', 'clientUser'];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            if (!clientUser) {
                console.error('clientUser is undefined');
                return;
            }

            const invites = await endpoints.transactions.getUserInvites(clientUser.id);
            return invites;
        },
        enabled: !!clientUser
    });

    return {
        clientUserInvites: query.data
    }
}