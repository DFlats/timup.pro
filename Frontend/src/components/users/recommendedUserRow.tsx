/* eslint-disable react/react-in-jsx-scope */
import { Link } from "@tanstack/react-router";
import { TagContainerCompact } from "../tags";
import { User } from "../../types";
import { useState } from "react";

interface Props {
    user: User,
    onInvite?: (userId: string) => void
}

export function RecommendedUserRow({ user, onInvite }: Props) {
    const [isInvited, setIsInvited] = useState("Invite")

    const inviteButtonProps = {
        onClick: () => {
            if (onInvite) {
                console.log('onInvate is defined')
                onInvite(user.id);
                setIsInvited("Success")
            }
        },
        className: `btn btn-accent text-lg text-white pl-10 pr-10 w-32 ${isInvited === "Success" && "btn-success"}`,
        disabled: onInvite == undefined
    };

    return (
        <tbody>
            <tr className="hover:bg-gray-500 hover:bg-opacity-15 border-b border-white border-opacity-10">
                <td>
                    <div className="border border-white border-opacity-10 rounded-full w-20 h-20 flex flex-col justify-end items-center overflow-hidden">
                        <div className="w-5 h-5 bg-gray-300 rounded-full mb-2"></div>
                        <div className="w-8 h-8 bg-gray-300 rounded-t-full"></div>
                    </div>
                </td>
                <td className="text-lg">{user.name}</td>
                <td>
                    <TagContainerCompact
                        tags={user.tags['skill']} />
                </td>
                <td>
                    <TagContainerCompact
                        tags={user.tags['interest']} />
                </td>
                <td>
                    <button {...inviteButtonProps}>
                        {isInvited === "Success" ? "Sent" : onInvite ? 'Invite' : 'Pending'}
                    </button>
                </td>
                <td>
                    <Link
                        to='/profile/$userId'
                        className="btn bg-slate-700 text-lg text-white pl-10 pr-10 w-32"
                        params={{ userId: user.id.toString() }}>
                        Details
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}