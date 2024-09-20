import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { endpoints, userFromUserPatchRequest, UserPatchRequest } from "../../api";
import { TagType } from "../../types";

export function useClientUser() {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const queryKey = ["users", "clientUser"];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            if (!user) throw new Error('Could not load clerk user');

            await endpoints.users.createUser({
                clerkId: user.id,
                email: user.primaryEmailAddress!.toString(),
                name: user.fullName!
            });

            return await endpoints.users.getUserByUserId(user.id);
        }
    });

    const clientUser = query.data;

    type ClientUserPatchRequest = Omit<UserPatchRequest, 'clerkId'>;

    const patchClientUser = async (userPatchRequest: ClientUserPatchRequest) => {
        if (!clientUser) {
            console.error("clientUser is not defined");
            return;
        }

        const patchRequest = {
            ...userPatchRequest,
            clerkId: query.data?.id
        }

        await endpoints.users.updateUser(patchRequest);

        queryClient.setQueryData(queryKey, userFromUserPatchRequest(clientUser, patchRequest))
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

        const request: UserPatchRequest = {
            clerkId: clientUser.id,
            skillTags: updatedSkillTags,
            interestTags: updatedInterestTags
        };

        console.log(request);

        await endpoints.users.updateUser(request);

        queryClient.setQueryData(queryKey, {
            ...clientUser,
            skillTags: updatedSkillTags ?? getSkillTags(),
            interestTags: updatedInterestTags ?? getInterestTags()
        });
    }

    return {
        clientUser: query.data,
        addTagToClientUser: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'add'),
        removeTagFromClientUser: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'remove'),
        patchClientUser
    }
}
