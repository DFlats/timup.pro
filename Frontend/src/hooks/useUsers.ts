import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsersByProjectId, getUserByUserId } from "../api";

type RecommendedForProject = {
  type: 'recommendedForProject',
  projectId: number
}

type UserId = {
  type: 'userId',
  userId: string
}

export function useUsers(params: RecommendedForProject | UserId) {
  const userId = params.type == 'userId' ? params.userId : undefined;
  const projectId = params.type == 'recommendedForProject' ? params.projectId : undefined;

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

  return {
    userById: userByIdQuery.data,
    usersRecommendedForProject: recommendedForProjectQuery.data,
  };
}
