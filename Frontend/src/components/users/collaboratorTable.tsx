/* eslint-disable react/react-in-jsx-scope */

import { useCollaborators } from "../../hooks/users";
import { CollaboratorRow } from "./collaboratorRow";

interface props {
    projectId: number
}

export function CollaboratorTable({ projectId }: props) {
    const {
        collaboratorsInProject,
        collaboratorsNextPage,
        collaboratorsPreviousPage,
        kickCollaborator
    } = useCollaborators(projectId);

    return (
        <div className="bg-[#010624] rounded-xl shadow-md shadow-gray-600 border border-white border-opacity-10 p-10 mb-16">
            <table className="table">
                <thead>
                    <tr className="border-b border-white border-opacity-10" >
                        <th></th>
                        <th className="text-lg">User Profile</th>
                        <th className="text-lg">Matching Skills</th>
                        <th className="text-lg">Matching Interests</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {collaboratorsInProject && collaboratorsInProject.map(user =>
                    <CollaboratorRow
                        key={user.id}
                        user={user}
                        onKick={kickCollaborator} />)}
            </table>
            {collaboratorsPreviousPage &&
                <button
                    className='btn btn-secondary m-4'
                    onClick={() => collaboratorsPreviousPage()}>Previous Page</button>
            }
            {collaboratorsNextPage &&
                <button
                    className='btn btn-secondary m-4'
                    onClick={() => collaboratorsNextPage()}>Next Page</button>
            }
        </div>
    )
}