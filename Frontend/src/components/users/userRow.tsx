/* eslint-disable react/react-in-jsx-scope */
import { Link } from "@tanstack/react-router";
import { TagContainer, TagContainerCompact } from "../tags";
import { User, Project } from "../../types";

interface Props {
    user: User
    project: Project
    size?: 'full' | 'compact'
}

export function UserRow({ project, user }: Props) {
    return (
        <tbody>
            <tr className="hover">
                <td><Link className="btn" to='/profile/$userId' params={{ userId: user.id.toString() }}> {user.name} </Link> </td>
                <td>
                    <TagContainerCompact
                        tags={user.tags['skill'].filter(userTag => project.tags['skill'].some(projectTag => projectTag == userTag))}
                        tagType={"skill"} />
                </td>
                <td>
                    <TagContainer
                        tags={user.tags['interest'].filter(userTag => project.tags['interest'].some(projectTag => projectTag == userTag))}
                        tagType={"interest"} />
                </td>
                <td>
                    <button className="btn">Invite</button>
                </td>
            </tr>
        </tbody>
    )
}