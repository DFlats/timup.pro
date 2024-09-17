/* eslint-disable react/react-in-jsx-scope */

import useUsers from "../hooks/useUsers";
import UserCard from "./UserCard";

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
                {users.map(user => <UserCard key={user.clerkId} user={user} />)}
            </table>
    )
}