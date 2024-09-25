/* eslint-disable react/react-in-jsx-scope */
import { useProjectInvites } from "../../hooks/transactions";
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
        inviteSuggestedUser
    } = useRecommendedUsersForProject(projectId);

    const { projectInvites } = useProjectInvites(projectId);

    if (!projectInvites) return;

    const userIsInvited = (userId: string) =>
        projectInvites.map(invite => invite.userId).includes(userId)

    return (
        <div className="bg-[#010624] rounded-xl border border-white border-opacity-10 p-10 mb-16">
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
            {recommendedUsersNextPage &&
                <button
                    className='btn btn-secondary m-4'
                    onClick={() => recommendedUsersNextPage()}>Previous Page</button>
            }
            {recommendedUsersPreviousPage &&
                <button
                    className='btn btn-secondary m-4'
                    onClick={() => recommendedUsersPreviousPage()}>Next Page</button>
            }
        </div>
    )
}