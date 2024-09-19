/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useUsers } from "../../hooks";
import { TagContainer } from "../../components/tags";
import { ProjectFeed } from "../projects";
import { EditUserModal } from "../users";
import { openEditUserModal } from "../../modalControllers";

export function ProfilePage() {
    const Route = getRouteApi('/profile/$userId');
    const { userId } = Route.useParams();

    const { userById: user } = useUsers({ type: 'userId', userId });
    const { clientUser } = useUsers({ type: 'clientUser' });

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

                    <ProjectFeed projectFeed={"ownedByUser"} />
                </>
            }
        </>
    );
}