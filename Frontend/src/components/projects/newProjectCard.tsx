import { CardTitle, CardDescription, CardFooter } from "..";
import { openCreateProjectModal } from "../../modalControllers";
import { Card } from "../layouts";
import { CreateProjectModal } from "./createProjectModal";

/* eslint-disable react/react-in-jsx-scope */
export function NewProjectCard() {
    return (
        <>
            <button onClick={openCreateProjectModal} className="button button-primary flex justify-center items-center m-4 w-96 h-96 shadow-xl">
                <Card>
                    <div className="h-1/2">
                        <CardTitle title={``} />
                        <CardDescription>
                            {`Click to create a new project`}
                        </CardDescription>
                        <CardFooter>
                            {``}
                        </CardFooter>
                    </div>
                </Card>
            </button>
            <CreateProjectModal />
        </>
    );
}