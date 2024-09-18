import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addTagToUser, getUserById, removeTagFromUser } from "../api/endpoints";

export function useClientUser() {

    const { user } = useUser();
    const queryClient = useQueryClient();

    const queryKey = ['clientUser'];

    const clientUserQuery = useQuery({
        queryKey,
        queryFn: async () => {
            if (!user) return;

            return await getUserById(user.id);
        },
        staleTime: Infinity,
        enabled: !!user
    });

    const setLocation = (location: google.maps.LatLngLiteral) => {
        const clientUser = clientUserQuery.data;
        if (!clientUser) return;

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            location
        });
    }

    const getSkillTags = () => {
        return clientUserQuery.data?.skillTags ?? [] as string[]
    }

    const getInterestTags = () => {
        return clientUserQuery.data?.interestTags ?? [] as string[]
    }

    const addTag = async (tagText: string, isSkill: boolean) => {

        const clientUser = clientUserQuery.data;
        if (!clientUser) return;

        await addTagToUser(clientUser.id, { tagName: tagText, isSkill });

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            skillTags: isSkill ? [...getSkillTags(), tagText] : getSkillTags(),
            interestTags: !isSkill ? [...getInterestTags(), tagText] : getInterestTags()
        });
    }

    const removeTag = async (tagText: string, isSkill: boolean) => {
        const clientUser = clientUserQuery.data;
        if (!clientUser) return;

        await removeTagFromUser(clientUser.id, { tagName: tagText, isSkill })

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            skillTags: isSkill ? getSkillTags().filter(t => t != tagText) : getSkillTags(),
            interestTags: !isSkill ? getInterestTags().filter(t => t != tagText) : getInterestTags()
        });
    }

    return {
        clientUser: clientUserQuery.data,
        addTag,
        removeTag,
        setLocation
    }
}