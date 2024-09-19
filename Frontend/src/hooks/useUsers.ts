import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsersByProjectId } from "../api";

export function useUsers(projectId: number) {
  console.log("PROJECT ID: " + projectId);
  // if (!projectId) return;
  const queryKeyUser = ["project", projectId];

  const userQuery = useQuery({
    queryKey: queryKeyUser,
    queryFn: async () => {
      return await getRecommendedUsersByProjectId(projectId);
    },
  });

  return {
    users: userQuery.data,
  };
}
