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

    const addSkillTag = async (tagText: string) => {
        const clientUser = clientUserQuery.data;
        if (!clientUser) return;

        await addTagToUser(clientUser.id, { tagName: tagText, isSkill: true });

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            skillTags: [...getSkillTags(), tagText]
        });
    };

    const removeSkillTag = async (tagText: string) => {
        const clientUser = clientUserQuery.data;
        if (!clientUser) return;

        await removeTagFromUser(clientUser.id, { tagName: tagText, isSkill: true })

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            skillTags: getSkillTags().filter(t => t != tagText)
        });
    }

    const addInterestTag = async (tagText: string) => {
        const clientUser = clientUserQuery.data;
        if (!clientUser) return;

        await addTagToUser(clientUser.id, { tagName: tagText, isSkill: false });

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            interestTags: [...getInterestTags(), tagText]
        });
    };

    const removeInterestTag = async (tagText: string) => {
        const clientUser = clientUserQuery.data;
        if (!clientUser) return;

        await removeTagFromUser(clientUser.id, { tagName: tagText, isSkill: false })

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            interestTags: getInterestTags().filter(t => t != tagText)
        });
    }

    return {
        clientUser: clientUserQuery.data,
        addTag: addSkillTag,
        removeTag: removeSkillTag,
        setLocation
    }
}