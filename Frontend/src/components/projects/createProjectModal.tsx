/* eslint-disable react/react-in-jsx-scope */
import { CreateProjectForm } from "../../components/projects";

export function CreateProjectModal() {
    return (
        <dialog
            id={import.meta.env.VITE_CREATE_PROJECT_MODAL_ID}
            className="modal">
            <div className="modal-box">
                <h3
                    className="font-bold text-3xl text-center p-8">
                    Create Project
                </h3>
                <CreateProjectForm />
            </div>
            <form
                method="dialog"
                className="modal-backdrop">
                <button>
                    close
                </button>
            </form>
        </dialog>
    )
}