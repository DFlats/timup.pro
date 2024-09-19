/* eslint-disable react/react-in-jsx-scope */
import { User } from "../../api";
import { TagContainer } from "../tags";

interface Props {
    user: User
}

export function UserRow({ user }: Props) {
    return (
        <tbody>
            <tr className="hover">
                <td>{user.name}</td>
                <TagContainer tags={user.skillTags} tagType={"skill"} />
                <TagContainer tags={user.interestTags} tagType={"interest"} />
            </tr>
        </tbody>
    )
}