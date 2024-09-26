/* eslint-disable react/react-in-jsx-scope */
import { useClientProjectInvites } from "../../hooks/transactions/useClientProjectInvites";
import { useClientUser } from "../../hooks/users";
import { useNavigate } from '@tanstack/react-router';

export function ProjectInvites() {
    const { clientUser } = useClientUser();

    const {
        clientProjectInvites,
        acceptInviteRequest,
        denyInviteRequest
    } = useClientProjectInvites();

    const navigate = useNavigate();

    if (!clientUser || !clientProjectInvites) return;

    if (clientProjectInvites.length == 0) return null;

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
                <div className="badge badge-secondary">
                    {`+${clientProjectInvites.length}`}
                </div>
                <h2 className='text-3xl'>{` Project Invites`}</h2>
            </div>
            <div className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[700px] p-2 shadow overflow-x-auto">
                <table className="table bg-sky-950">
                    <tbody>
                        {clientProjectInvites.map(invite => (
                            <tr
                                key={(invite.userId + invite.projectId)}>
                                <td>
                                    <button
                                        className='btn w-96 btn-secondary'
                                        onClick={() => {
                                            navigate({ to: '/profile/$userId', params: { userId: invite.userId } });
                                        }
                                        }>
                                        <p className='p-2'>{invite.projectTitle}</p>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='btn btn-success'
                                        onClick={() => acceptInviteRequest(invite)}>
                                        Accept
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => denyInviteRequest(invite)}>
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