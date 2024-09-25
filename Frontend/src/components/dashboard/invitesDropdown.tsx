/* eslint-disable react/react-in-jsx-scope */
import { useClientUserInvites } from "../../hooks/transactions";
import { useClientUser } from "../../hooks/users";
import { useNavigate } from '@tanstack/react-router';

export function InvitesDropdown() {
    const { clientUser } = useClientUser();
    const { acceptInvite, denyInvite } = useClientUserInvites();
    const navigate = useNavigate();

    if (!clientUser) return;

    const clientUserInvites = [
        {
            title: "A nice project",
            id: 2
        },
        {
            title: "Another project",
            id: 3
        },
        {
            title: "Third project",
            id: 4
        },
    ]

    if (clientUserInvites.length == 0) return null;

    return (
        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1">
                <div className="badge badge-secondary">
                    {`+${clientUserInvites.length}`}
                </div>
                <h2 className='text-3xl'>{` Invites`}</h2>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {clientUserInvites.map(invite => (
                    <li key={invite.id}>
                        <div className="flex flex-row w-full">
                            <button
                                className='btn'
                                onClick={() => navigate({ to: '/project/$id', params: { id: invite.id.toString() } })}>
                                {invite.title}
                            </button>
                            <button
                                className='btn'
                                onClick={() => acceptInvite(invite.id)}>
                                Accept
                            </button>
                            <button
                                className='btn'
                                onClick={() => denyInvite(invite.id)}>
                                Deny
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
}