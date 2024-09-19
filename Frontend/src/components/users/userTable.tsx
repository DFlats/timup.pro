/* eslint-disable react/react-in-jsx-scope */
import { UserRow } from "../../components/users";
import { useUsers } from "../../hooks";
import { Link } from "@tanstack/react-router";

interface props {
    projectId: number;
}

export function UserTable({ projectId }: props) {
    const { usersRecommendedForProject: users } = useUsers({ type: 'recommendedForProject', projectId });

    return (
        <Link className="" to='/project/$id' params={{ id: projectId.toString() }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                {users && users.map(user => <UserRow key={user.id} user={user} />)}
            </table>
        </Link>
    )
}