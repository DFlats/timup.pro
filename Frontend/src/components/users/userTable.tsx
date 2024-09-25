/* eslint-disable react/react-in-jsx-scope */
import { UserRow } from "../../components/users";
import { Project, User } from "../../types";

interface props {
    users: User[],
    onNextPage?: () => void,
    onPreviousPage?: () => void,
    onInvite?: (userId: string) => Promise<"Error" | "Success" | undefined>,
    project: Project
}

export function UserTable({ users, onNextPage, onPreviousPage, onInvite, project }: props) {
    return (
        <div className="bg-[#010624] rounded-xl border border-white border-opacity-10 p-10 mb-16">
            <table className="table">
                <thead>
                    <tr className="border-b border-white border-opacity-10" >
                        <th></th>
                        <th className="text-lg">User Profile</th>
                        <th className="text-lg">Matching Skills</th>
                        <th className="text-lg">Matching Interests</th>
                        {onInvite && <th></th>}
                    </tr>
                </thead>
                {users && users.map(user => <UserRow key={user.id} onInvite={onInvite} user={user} size='compact' project={project}/>)}
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