/* eslint-disable react/react-in-jsx-scope */

import { User } from "../api/types";

interface Props {
    user: User
}

export default function UserCard({ user }: Props) {
    return (
        <tbody>
            <tr className="hover">
                <td>{user.name}</td>
                <td>{user.tags?.map(tag => tag.tagValue)}</td>
            </tr>
        </tbody>
    )
}