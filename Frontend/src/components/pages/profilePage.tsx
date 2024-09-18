/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useClientUser, useClientUserModal, useUser } from "../../hooks";
import { TagContainer } from "../../components/tags";

export function ProfilePage() {
    const Route = getRouteApi('/profile/$userId');
    const { userId } = Route.useParams();

    const { user } = useUser(userId);
    const { clientUser } = useClientUser();

    const { openClientUserModal } = useClientUserModal()

    if (!user) return;

    const userIsClient = clientUser && user.id == clientUser.id;

    const finalUser = userIsClient ? clientUser : user;

    return (
        <>
            <h1>{finalUser.name}</h1>
            <TagContainer tags={finalUser.skillTags} tagType='skill' />
            <TagContainer tags={finalUser.interestTags} tagType='interest' />
            {userIsClient &&
                <button
                    className='btn'
                    onClick={openClientUserModal}>
                    Edit Profile
                </button>
            }
        </>
    );
}