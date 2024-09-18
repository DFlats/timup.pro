/* eslint-disable react/react-in-jsx-scope */

import { CreateProjectForm } from ".";

export function CreateProjectModal() {
    return (
        <dialog id="create-project" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-3xl text-center p-8">Create Project</h3>
                <CreateProjectForm />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}