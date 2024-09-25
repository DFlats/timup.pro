/* eslint-disable react/react-in-jsx-scope */
import { Link } from "@tanstack/react-router";
import { TagContainerCompact } from "../tags";
import { Project, User } from "../../types";
import { useState } from "react";
import { useTransactionActions } from "../../hooks";

interface Props {
    user: User,
    onInvite?: (userId: string) => Promise<"Error" | "Success" | undefined>,
    size?: 'full' | 'compact',
    project: Project
}

export function UserRow({ user, onInvite, project }: Props) {
    const [invite, setInvite] = useState("Invite")
    const [leave, setLeave] = useState("Kick")
    const pendingInvite = project.pendingInvites.includes(user.id)
    const { kickUserFromProject } = useTransactionActions();

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

    async function handleLeave() {
        try {
            await kickUserFromProject(user.id, project.id);
            setLeave("Success");
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "User not found in project") {
                    setLeave("Success");
                }
                console.log("Error: " + error.message);
                setLeave("Error");
            }
            setLeave("Error");
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
                    (<td><button onClick={() => handleLeave()} className={`btn btn-accent text-lg text-white pl-10 pr-10  w-32 ${leave === 'Success' && 'btn-success'} ${leave === 'Error' && 'btn-error'}`}>{leave === 'Success' ? 'Kicked' : leave === 'Error' ? 'Error' : 'Kick'}</button></td>)}
                <td><Link to='/profile/$userId' className="btn bg-slate-700 text-lg text-white pl-10 pr-10 w-32" params={{ userId: user.id.toString() }}>Details</Link></td>
            </tr>
        </tbody>
    )
}