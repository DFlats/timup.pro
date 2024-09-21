import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { TagType, UserPatch } from "../../types";

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
        console.log("updating tags", operation);

        if (!clientUser) return;

        if (operation == 'add') {
            switch (tagType) {
                case 'skill':
                    if (clientUser.skillTags.includes(tagText)) return;
                    break;
                case 'interest':
                    if (clientUser.interestTags.includes(tagText)) return;
                    break;
            }
        }

        const calculateUpdatedTags = (): { updatedSkillTags?: string[], updatedInterestTags?: string[] } => {
            if (operation == 'add' && tagType == 'skill')
                return { updatedSkillTags: [...getSkillTags(), tagText] }
            if (operation == 'add' && tagType == 'interest')
                return { updatedInterestTags: [...getInterestTags(), tagText] }
            if (operation == 'remove' && tagType == 'skill')
                return { updatedSkillTags: getSkillTags().filter(t => t != tagText) }
            if (operation == 'remove' && tagType == 'interest')
                return { updatedInterestTags: getInterestTags().filter(t => t != tagText) }
            return {}
        }

        const { updatedSkillTags, updatedInterestTags } = calculateUpdatedTags();

        const patch: UserPatch = {
            skillTags: updatedSkillTags,
            interestTags: updatedInterestTags
        } as UserPatch;

        console.log(patch);

        patchClientUser(patch);
    }

    return {
        clientUser: query.data,
        addTagToClientUser: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'add'),
        removeTagFromClientUser: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'remove'),
        patchClientUser
    }
}
