/* eslint-disable react/react-in-jsx-scope */
import { useUsers } from "../../hooks";
import { UserRow } from ".";

export function UserTable() {
    const { users } = useUsers();

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Skills</th>
                </tr>
            </thead>
            {users.map(user => <UserRow key={user.id} user={user} />)}
        </table>
    )
}