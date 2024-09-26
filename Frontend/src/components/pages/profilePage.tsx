/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { EditUserModal } from "../users";
import { openEditUserModal } from "../../modalControllers";
import { useClientUser, useUserById } from "../../hooks/users";
import { ProjectsOwnedByClientUser } from "..";
import { UserCard } from "../users/userCard";

export function ProfilePage() {
    const Route = getRouteApi('/profile/$userId');
    const { userId } = Route.useParams() as { userId: string };

    const { userById: user } = useUserById(userId);
    const { clientUser } = useClientUser();

    if (!user) return;

    const userIsClient = clientUser && user.id == clientUser.id;

    return (
        <>

            <>
                <div className="flex flex-col items-center">
                    <UserCard userId={user.id} pageTitle={`Profile`} />
                    {userIsClient &&
                        <>
                            <EditUserModal />
                            <button
                                className='btn btn-accent w-full text-slate-50 text-xl mt-5 '
                                onClick={openEditUserModal}>
                                Edit Profile
                            </button>
                        </>
                    }
                </div>
                <ProjectsOwnedByClientUser />
            </>

        </>
    );
}