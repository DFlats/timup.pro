/* eslint-disable react/react-in-jsx-scope */
import { useClientUserInvites } from "../../hooks/transactions";
import { useClientUser } from "../../hooks/users";
import { useNavigate } from '@tanstack/react-router';

export function UserInvites() {
    const { clientUser } = useClientUser();
    const { projectsInvitedTo, acceptInvite, denyInvite } = useClientUserInvites();
    const navigate = useNavigate();

    if (!clientUser || !projectsInvitedTo) return;

    if (projectsInvitedTo.length == 0) return null;

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
                <div className="badge badge-secondary">
                    {`+${projectsInvitedTo.length}`}
                </div>
                <h2 className='text-3xl'>{` Project Invites`}</h2>
            </div>
            <div className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[700px] p-2 shadow overflow-x-auto">
                <table className="table bg-sky-950">
                    <tbody>
                        {projectsInvitedTo.map(invite => (
                            <tr
                                key={invite.id}>
                                <td>
                                    <button
                                        className='btn w-96 btn-secondary'
                                        onClick={() => {
                                            navigate({ to: '/project/$id', params: { id: invite.id.toString() } });
                                        }
                                        }>
                                        <p className='p-2'>{invite.title}</p>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='btn btn-success'
                                        onClick={() => acceptInvite(invite.id)}>
                                        Accept
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => denyInvite(invite.id)}>
                                        Deny
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}