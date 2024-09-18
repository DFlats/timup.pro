/* eslint-disable react/react-in-jsx-scope */
import { User } from "../api";

interface Props {
    user: User
}

export function UserCard({ user }: Props) {
    return (
        <tbody>
            <tr className="hover">
                <td>{user.name}</td>
                <td>{user.skillTags?.map(tag => <p className="badge badge-primary mr-2" key={tag}>{tag}</p>)}</td>
                <td>{user.interestTags?.map(tag => <p className="badge badge-primary mr-2" key={tag}>{tag}</p>)}</td>
            </tr>
        </tbody>
    )
}