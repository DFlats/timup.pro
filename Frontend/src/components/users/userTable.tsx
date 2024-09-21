/* eslint-disable react/react-in-jsx-scope */
import { Project } from "../../api";
import { UserRow } from "../../components/users";
import { useRecommendedUsersForProject } from "../../hooks/users";

interface props {
    project: Project;
}

export function UserTable({ project }: props) {
    const projectId = project.id
    const { recommendedUsersForProject: users } = useRecommendedUsersForProject(projectId);

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