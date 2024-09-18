/* eslint-disable react/react-in-jsx-scope */
import { useUsers } from "../hooks";
import { UserCard } from "./";

export default function UserGallery() {
    const { users } = useUsers();

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Skills</th>
                </tr>
            </thead>
            {users.map(user => <UserCard key={user.id} user={user} />)}
        </table>
    )
}