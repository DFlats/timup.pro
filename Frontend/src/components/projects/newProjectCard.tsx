/* eslint-disable react/react-in-jsx-scope */
import { CardDescription} from "..";
import { openCreateProjectModal } from "../../modalControllers";
import { Card } from "../layouts";
import { CreateProjectModal } from "./createProjectModal";

export function NewProjectCard() {
    return (
        <Card>
            <button onClick={openCreateProjectModal} className="button w-full h-full">
                <CardDescription>
                    {`Click to create a new project`}
                </CardDescription>
                <p className="text-9xl pb-10">+</p>
                <CreateProjectModal />
            </button>
        </Card>
    );
}