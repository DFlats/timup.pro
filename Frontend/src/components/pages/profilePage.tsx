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

                    <ProjectFeed projectFeed={"projectsOwnedByClientUser"} />

                </>
            }
        </>
    );
    // TODO: Put this in project feed when asking for client projects
    // return (
    //     <>
    //         <h1 className='text-4xl mb-8'>Projects you are in</h1>
    //         {projects?.map(project => <ProjectCard key={project.title} project={project} />)}
    //         <button onClick={handleModal} className="button button-primary flex justify-center items-center m-4 w-96 h-96 shadow-xl">
    //             <div className="text-8xl">+</div>
    //         </button>
    //         <CreateProjectModal />
    //     </>
    // );
}