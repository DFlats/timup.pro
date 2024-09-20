/* eslint-disable react/react-in-jsx-scope */
import { ProjectResponse } from "../../api";
import { UserRow } from "../../components/users";
import { useUsers } from "../../hooks";

interface props {
    project: ProjectResponse;
}

export function UserTable({ project }: props) {
    const projectId = project.id
    const { usersRecommendedForProject: users } = useUsers({ type: 'recommendedForProject', projectId });

    return (
        // <Link className="" to='/project/$id' params={{ id: projectId.toString() }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>User Profile</th>
                        <th>Matching Skills</th>
                        <th>Matching Interests</th>
                        <th></th>
                    </tr>
                </thead>
                {users && users.map(user => <UserRow key={user.id} user={user} project={project} size='compact' />)}
            </table>
        // </Link>
    )
}