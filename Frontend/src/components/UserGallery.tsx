/* eslint-disable react/react-in-jsx-scope */

import useUsers from "../hooks/useUsers";
import UserCard from "./UserCard";

export default function UserGallery() {
    const { users } = useUsers();

    return (
        <div className="flex flex-col">
            {users.map(user => <UserCard key={user.clerkId} user={user} />)}
        </div>
    )
}