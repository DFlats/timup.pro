/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useUser } from "../../hooks";

export function ProfilePage() {
    const Route = getRouteApi('/profile/$userId');
    const { userId } = Route.useParams();
    const { user } = useUser(userId);

    if (!user) return;

    return (<>
        <h1>{user.name}</h1>
        <p>{user.}</p>
    </>)
}