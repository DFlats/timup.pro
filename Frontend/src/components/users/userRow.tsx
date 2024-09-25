/* eslint-disable react/react-in-jsx-scope */
import { Link } from "@tanstack/react-router";
import { TagContainerCompact } from "../tags";
import { Project, User } from "../../types";
import { useState } from "react";

interface Props {
    user: User,
    onInvite?: (userId: string) => Promise<"Error" | "Success" | undefined>,
    size?: 'full' | 'compact',
    project: Project
}

export function UserRow({ user, onInvite, project }: Props) {
    const [invite, setInvite] = useState("Invite")
    const pendingInvite = project.pendingInvites.includes(user.id)

    async function handleInvite() {
        if (onInvite) {
            const result = await onInvite(user.id)
            if (result === "Success") {
                setInvite("Success")
            }
            if (result === "Error") {
                console.log("Error")
                setInvite("Error")
            }
        }
    }

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
                {onInvite &&
                    (<td><button onClick={() => handleInvite()} className={`btn btn-accent text-lg text-white pl-10 pr-10 w-32 ${invite === 'Error' && 'btn-error'} ${invite === 'Success' && 'btn-success'} ${pendingInvite && 'btn-disabled'}`} >{invite === 'Success' ? 'Sent' : pendingInvite ? 'Pending' : invite === 'Error' ? 'Error' : 'Invite'}</button></td>)}
                {!onInvite &&
                    (<td><button className="btn btn-accent text-lg text-white pl-10 pr-10  w-32">Kick</button></td>)}
                <td><Link to='/profile/$userId' className="btn bg-slate-700 text-lg text-white pl-10 pr-10 w-32" params={{ userId: user.id.toString() }}>Details</Link></td>
            </tr>
        </tbody>
    )
}