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
        <table className="table">
            <thead>
                <tr>
                    <th>User Profile</th>
                    <th>Matching Skills</th>
                    <th>Matching Interests</th>
                    {onInvite && <th></th>}
                </tr>
            </thead>
            {users && users.map(user => <UserRow key={user.id} onInvite={onInvite} user={user} size='compact' />)}
        </table>
        // </Link>
    )
}