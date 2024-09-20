import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getRecommendedUsersByProjectId, getUserByUserId, updateUser, UserPatchRequest } from "../api";
import { useUser } from "@clerk/clerk-react";
import { TagType } from "../types";

type RecommendedForProject = {
  type: 'recommendedForProject',
  projectId: number
}

type UserId = {
  type: 'userId',
  userId: string
}

type Client = {
  type: 'clientUser'
}

export function useUsers(params: RecommendedForProject | UserId | Client) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const userId = params.type == 'userId' ? params.userId : undefined;
  const projectId = params.type == 'recommendedForProject' ? params.projectId : undefined;

  const queryKeyClientUser = ["users", "client"];
  const queryKeyRecommendedForProject = ["users", "recommendedForProject", projectId];
  const queryKeyUserById = ["users", "byId", userId];

  const recommendedForProjectQuery = useQuery({
    queryKey: queryKeyRecommendedForProject,
    queryFn: async () => {
      return await getRecommendedUsersByProjectId(projectId!);
    },
    enabled: params.type == 'recommendedForProject'
  });

  const userByIdQuery = useQuery({
    queryKey: queryKeyUserById,
    queryFn: async () => {
      return await getUserByUserId(userId!);
    },
    enabled: params.type == 'userId'
  });

  const clientUserQuery = useQuery({
    queryKey: queryKeyClientUser,
    queryFn: async () => {
      if (!user) throw new Error('Could not load clerk user');

      await createUser({
        clerkId: user.id,
        email: user.primaryEmailAddress!.toString(),
        name: user.fullName!
      });

      return await getUserByUserId(user.id);
    },
    enabled: params.type == 'clientUser'
  });

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
      clerkId: clientUser.id,
      skillTags: updatedSkillTags,
      interestTags: updatedInterestTags
    };

    await updateUser(request);

    queryClient.setQueryData(queryKeyClientUser, {
      ...clientUser,
      skillTags: updatedSkillTags ?? getSkillTags(),
      interestTags: updatedInterestTags ?? getInterestTags()
    });
  }

  return {
    userById: userByIdQuery.data,
    usersRecommendedForProject: recommendedForProjectQuery.data,
    clientUser: clientUserQuery.data,
    addTagToClientUser: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'add'),
    removeTagFromClientUser: async (tagText: string, tagType: TagType) => updateTags(tagText, tagType, 'remove'),
  };
}
