/* eslint-disable react/react-in-jsx-scope */
import { CreateProjectForm } from "../../components/projects";

export function CreateProjectModal() {
    return (
        <dialog
            id={import.meta.env.VITE_CREATE_PROJECT_MODAL_ID}
            className="modal">
            <div className="modal-box max-w-[29rem] p-14 pt-2 bg-[#010624] border border-white border-opacity-10">
                <h3
                    className="font-bold text-xl text-white text-center pt-8">
                    Create Project
                </h3>
                <p className="pb-8 pt-1 text-center">Fill in the details to create a new project.</p>
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