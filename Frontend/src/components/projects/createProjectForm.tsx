/* eslint-disable react/react-in-jsx-scope */
import { SubmitHandler, useForm } from "react-hook-form"
import { useClientUser, useProjects } from "../../hooks";
import { useNavigate } from "@tanstack/react-router";

type Inputs = {
    title: string;
    description: string;
};


export function CreateProjectForm() {
    const { clientUser } = useClientUser();
    const navigate = useNavigate();
    const { createProject } = useProjects('ownedByUser');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!clientUser || !createProject) return;
        const createdProject = await createProject(data.title, data.description, clientUser.id);
        const modal = document.getElementById(import.meta.env.VITE_CREATE_PROJECT_MODAL_ID) as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
        navigate({
            to: '/project/$id',
            params: { id: createdProject.id.toString() }
        })
        reset();
    }

    if (!clientUser) return;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="pt-8 pb-1" htmlFor="name">Title* {errors.title && <span>This field is required</span>}</label>
            <input className="input input-bordered input-primary w-full mb-6" {...register("title", { required: true })} />

            <label className="pt-8 pb-1" htmlFor="name">Description* {errors.description && <span>This field is required</span>}</label>
            <input className="input input-bordered input-primary w-full mb-10" {...register("description", { required: true })} />

            <button className="btn btn-primary mb-4 w-full" type="submit">Submit</button>
        </form>
    )
}