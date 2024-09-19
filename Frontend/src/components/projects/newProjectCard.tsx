import { openCreateProjectModal } from "../../modalControllers";
import { CreateProjectModal } from "./createProjectModal";

/* eslint-disable react/react-in-jsx-scope */
export function NewProjectCard() {
    return (
        <>
            <button onClick={openCreateProjectModal} className="button button-primary flex justify-center items-center m-4 w-96 h-96 shadow-xl">
                <div className="text-8xl">+</div>
            </button>
            <CreateProjectModal />
        </>
    );
}