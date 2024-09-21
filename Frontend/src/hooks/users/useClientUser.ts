import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { endpoints, UserPatch } from "../../api";
import { TagType } from "../../types";

export function useClientUser() {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const queryKey = ["users", "clientUser"];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            if (!user) throw new Error('Could not load clerk user');

            await endpoints.users.confirmUserExists({
                id: user.id,
                email: user.primaryEmailAddress!.toString(),
                name: user.fullName!
            });

            return await endpoints.users.getUserByUserId(user.id);
        }
    });

    const clientUser = query.data;

    const patchClientUser = async (userPatch: UserPatch) => {
        if (!clientUser) {
            console.error("clientUser is not defined");
            return;
        }

        const patchedClientUser = await endpoints.users.updateUser(userPatch, clientUser.id);

        queryClient.setQueryData(queryKey, patchedClientUser)
    }

    const getSkillTags = () => {
        return query.data?.skillTags ?? [] as string[]
    }

    const getInterestTags = () => {
        return query.data?.interestTags ?? [] as string[]
    }

    const updateTags = async (tagText: string, tagType: TagType, operation: 'add' | 'remove') => {
        const clientUser = query.data;

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


        patchClientUser({
            skillTags: updatedSkillTags,
            interestTags: updatedInterestTags
        } as UserPatch)
    }

    return {
        clientUser: query.data,
        addTagToClientUser: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'add'),
        removeTagFromClientUser: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'remove'),
        patchClientUser
    }
}
