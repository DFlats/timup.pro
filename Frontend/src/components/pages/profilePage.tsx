/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { TagContainer } from "../../components/tags";
import { EditUserModal } from "../users";
import { openEditUserModal } from "../../modalControllers";
import { useClientUser, useUserById } from "../../hooks/users";
import { ProjectsOwnedByClientUser } from "..";

export function ProfilePage() {
    const Route = getRouteApi('/profile/$userId');
    const { userId } = Route.useParams();

    const { userById: user } = useUserById(userId);
    const { clientUser } = useClientUser();

    if (!user) return;

    const userIsClient = clientUser && user.id == clientUser.id;

    const finalUser = userIsClient ? clientUser : user;

    return (
        <>
            <h1>{finalUser.name}</h1>
            <TagContainer tags={finalUser.skillTags} tagType='skill' />
            <TagContainer tags={finalUser.interestTags} tagType='interest' />
            <EditUserModal />
            {userIsClient &&
                <>
                    <button
                        className='btn'
                        onClick={openEditUserModal}>
                        Edit Profile
                    </button>

                    <ProjectsOwnedByClientUser />
                </>
            }
        </>
    );
}