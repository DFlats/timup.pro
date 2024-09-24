import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { Tag, UserPatch } from "../../types";

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

    const updateTags = async (tag: Tag, operation: 'add' | 'remove') => {
        if (!clientUser) return;

        if (operation == 'add') {
            switch (tag.kind) {
                case 'skill':
                    if (clientUser.tags['skill'].map(t => t.title).includes(tag.title)) return;
                    break;
                case 'interest':
                    if (clientUser.tags['interest'].map(t => t.title).includes(tag.title)) return;
                    break;
            }
        }

        const newTags = { ...clientUser.tags };

        if (operation == 'add') newTags[tag.kind].push(tag);
        else newTags[tag.kind] = newTags[tag.kind].filter(t => t.title != tag.title);

        const patch: UserPatch = {
            tags: newTags,
        } as UserPatch;

        console.log(patch);

        patchClientUser(patch);
    }

    return {
        clientUser: query.data,
        addTagToClientUser: async (tag: Tag) => updateTags(tag, 'add'),
        removeTagFromClientUser: async (tag: Tag) => updateTags(tag, 'remove'),
        patchClientUser
    }
}
