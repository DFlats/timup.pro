import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserByUserId, createUser, updateUser, UserPatchRequest } from "../api";
import { TagType } from "../types";

export function useClientUser() {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const queryKey = ['user', 'client'];

    const clientUserQuery = useQuery({
        queryKey,
        queryFn: async () => {
            if (!user) throw new Error('Could not load clerk user');

            await createUser({
                clerkId: user.id,
                email: user.primaryEmailAddress!.toString(),
                name: user.fullName!
            });

            return await getUserByUserId(user.id);
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

    const updateTags = async (tagText: string, tagType: TagType, operation: 'add' | 'remove') => {
        const clientUser = clientUserQuery.data;

        if (!clientUser) return;

        const calculateUpdatedTags = (): { updatedSkillTags?: string[], updatedInterestTags?: string[] } => {
            if (operation == 'add' && tagType == 'skill')
                return { updatedSkillTags: [...getSkillTags(), tagText] }
            if (operation == 'add' && tagType == 'interest')
                return { updatedInterestTags: [...getInterestTags(), tagText] }
            if (operation == 'remove' && tagType == 'skill')
                return { updatedSkillTags: [...getSkillTags(), tagText] }
            if (operation == 'remove' && tagType == 'interest')
                return { updatedInterestTags: [...getInterestTags(), tagText] }
            return {}
        }

        const { updatedSkillTags, updatedInterestTags } = calculateUpdatedTags();

        const request: UserPatchRequest = {
            skillTags: updatedSkillTags,
            interestTags: updatedInterestTags
        };

        await updateUser(request);

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            skillTags: updatedSkillTags ?? getSkillTags(),
            interestTags: updatedInterestTags ?? getInterestTags()
        });
    }

    return {
        clientUser: clientUserQuery.data,
        addTag: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'add'),
        removeTag: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'remove'),
        setLocation
    }
}