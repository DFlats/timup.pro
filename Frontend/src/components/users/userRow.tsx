/* eslint-disable react/react-in-jsx-scope */
import { Link } from "@tanstack/react-router";
import { ProjectResponse, User } from "../../api";
import { TagContainer } from "../tags";

interface Props {
    user: User
    project: ProjectResponse
    size?: 'full' | 'compact'
}

export function UserRow({ project, user, size = 'full' }: Props) {
    return (
        <tbody>
            <tr className="hover">
                <td><Link className="btn" to='/profile/$userId' params={{ userId: user.id.toString() }}> {user.name} </Link> </td>
                <td>
                    <TagContainer tags={user.skillTags.filter(userTag => project.skillTags.some(projectTag => projectTag == userTag))} tagType={"skill"} size={size} />
                </td>
                <td>
                    <TagContainer tags={user.interestTags.filter(userTag => project.interestTags.some(projectTag => projectTag == userTag))} tagType={"interest"} size={size} />
                </td>
                <td>
                    <button className="btn">Invite</button>
                </td>
            </tr>
        </tbody>
    )
}