/* eslint-disable react/react-in-jsx-scope */

import { CreateProjectForm } from "./CreateProjectForm";

export function CreateProjectModal() {
    return (
        <dialog id="create-project" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create Project</h3>
                <CreateProjectForm />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}