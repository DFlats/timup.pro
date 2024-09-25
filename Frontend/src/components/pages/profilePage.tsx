/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { TagContainer } from "../../components/tags";
import { EditUserModal } from "../users";
import { openEditUserModal } from "../../modalControllers";
import { useClientUser, useUserById } from "../../hooks/users";
import { ProjectsOwnedByClientUser } from "..";
import { User } from "../../types";

export function ProfilePage() {
    const Route = getRouteApi('/profile/$userId');
    const { userId } = Route.useParams() as { userId: string };

    const { userById: user } = useUserById(userId) as { userById: User | undefined };
    const { clientUser } = useClientUser();

    if (!user) return;

    const userIsClient = clientUser && user.id == clientUser.id;

    const finalUser = userIsClient ? clientUser : user;

    return (
        <>
            <h1>{finalUser.name}</h1>
            <TagContainer tags={finalUser.tags['skill']} tagType='skill' />
            <TagContainer tags={finalUser.tags['interest']} tagType='interest' />
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