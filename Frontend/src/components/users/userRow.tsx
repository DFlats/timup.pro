/* eslint-disable react/react-in-jsx-scope */
import { Link } from "@tanstack/react-router";
import { TagContainerCompact } from "../tags";
import { User } from "../../types";

interface Props {
    user: User,
    onInvite?: (userId: string) => void
    size?: 'full' | 'compact'
}

export function UserRow({ user, onInvite }: Props) {
    return (
        <tbody>
            <tr className="hover">
                <td><Link className="btn" to='/profile/$userId' params={{ userId: user.id.toString() }}> {user.name} </Link> </td>
                <td>
                    <TagContainerCompact
                        tags={user.tags['skill']}
                        tagType={"skill"} />
                </td>
                <td>
                    <TagContainerCompact
                        tags={user.tags['interest']}
                        tagType={"interest"} />
                </td>
                {onInvite &&
                    (<td><button onClick={() => onInvite(user.id)} className="btn">Invite</button></td>)}
            </tr>
        </tbody>
    )
}