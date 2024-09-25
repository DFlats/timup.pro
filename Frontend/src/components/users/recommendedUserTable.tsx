/* eslint-disable react/react-in-jsx-scope */
import { UserRow } from "../../components/users";
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

    return (
        <div className="bg-[#010624] rounded-xl border border-white border-opacity-10 p-10 mb-16">
            <table className="table">
                <thead>
                    <tr className="border-b border-white border-opacity-10" >
                        <th></th>
                        <th className="text-lg">Suggested User</th>
                        <th className="text-lg">Matching Skills</th>
                        <th className="text-lg">Matching Interests</th>
                        {onInvite && <th></th>}
                    </tr>
                </thead>
                {users && users.map(user =>
                    <RecommendedUserRow
                        key={user.id}
                        onInvite={onInvite}
                        onKick={onKick}
                        user={user}
                        size='compact' />)}
            </table>
            {onPreviousPage &&
                <button
                    className='btn btn-secondary m-4'
                    onClick={() => onPreviousPage()}>Previous Page</button>
            }
            {onNextPage &&
                <button
                    className='btn btn-secondary m-4'
                    onClick={() => onNextPage()}>Next Page</button>
            }
        </div>
    )
}