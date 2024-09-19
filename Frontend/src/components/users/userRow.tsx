/* eslint-disable react/react-in-jsx-scope */
import { User } from "../../api";
import { TagContainer } from "../tags";

interface Props {
    user: User
    size?: 'full' | 'compact'
}

export function UserRow({ user, size = 'full' }: Props) {
    return (
        <tbody>
            <tr className="hover">
                <td>{user.name}</td>
                <TagContainer tags={user.skillTags} tagType={"skill"} size={size} />
                <TagContainer tags={user.interestTags} tagType={"interest"} size={size} />
            </tr>
        </tbody>
    )
}