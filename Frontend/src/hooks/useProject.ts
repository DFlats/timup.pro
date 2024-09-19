import { useQuery } from "@tanstack/react-query";
import { getProjectById, postProject, Project, recommendedUsersByProjectId } from "../api";
import { useProjects } from "./useProjects";

export function useProject(id?: number) {
  const queryKeyProject = ["project", id];

  const { addUserProject } = useProjects('user');

  const projectQuery = useQuery({
    queryKey: queryKeyProject,
    queryFn: async () => {
      if (!id) return;
      return await getProjectById(id);
    },
    enabled: !!id,
    staleTime: Infinity,
  });

  const createProject = async (
    title: string,
    description: string,
    authorId: string
  ) => {
    const responseProject = await postProject({ title, description, authorId });

  };

  return {
    project: projectQuery.data,
    createProject,
  };
}
