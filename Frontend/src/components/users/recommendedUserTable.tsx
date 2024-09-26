/* eslint-disable react/react-in-jsx-scope */
import { useProjectById } from "../../hooks/projects/useProjectById";
import { useRecommendedUsersForProject } from "../../hooks/users";
import { RecommendedUserRow } from "./recommendedUserRow";

interface props {
    projectId: number
}

export function RecommendedUserTable({ projectId }: props) {
    const {
        recommendedUsersForProject,
        recommendedUsersNextPage,
        recommendedUsersPreviousPage,
        recommendedUsersCurrentPage,
        inviteSuggestedUser
    } = useRecommendedUsersForProject(projectId);

    const { projectById } = useProjectById(projectId);


    const userIsInvited = (userId: string) =>
        projectById?.pendingInvites.includes(userId)

    return (
        <div className="bg-[#010624] rounded-xl shadow-md shadow-gray-600  border border-white border-opacity-10 p-10 mb-16">
            <table className="table">
                <thead>
                    <tr className="border-b border-white border-opacity-10" >
                        <th></th>
                        <th className="text-lg"></th>
                        <th className="text-lg">Matching Skills</th>
                        <th className="text-lg">Matching Interests</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {recommendedUsersForProject && recommendedUsersForProject.map(user =>
                    <RecommendedUserRow
                        key={user.id}
                        onInvite={userIsInvited(user.id) ? undefined : inviteSuggestedUser}
                        user={user} />)
                }
            </table>
            <div className="join mt-8">
                {recommendedUsersNextPage &&
                    <button
                        className='join-item btn bg-[#010624] text-xl'
                        onClick={() => recommendedUsersNextPage()}>«</button>
                }
                <button className="join-item btn bg-[#010624] text-xl">{recommendedUsersCurrentPage}</button>
                {recommendedUsersPreviousPage &&
                    <button
                        className='join-item btn bg-[#010624] text-xl'
                        onClick={() => recommendedUsersPreviousPage()}>»</button>
                }
            </div>
        </div>
    )
}