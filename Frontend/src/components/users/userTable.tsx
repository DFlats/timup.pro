/* eslint-disable react/react-in-jsx-scope */
import { UserRow } from "../../components/users";
import { User } from "../../types";

interface props {
    users: User[],
    onInvite?: (userId: string) => void
}

export function UserTable({ users, onInvite }: props) {
    return (
        // <Link className="" to='/project/$id' params={{ id: projectId.toString() }}>
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
                {users && users.map(user => <UserRow key={user.id} onInvite={onInvite} user={user} size='compact' />)}
            </table>
        </div>
        // </Link>
    )
}