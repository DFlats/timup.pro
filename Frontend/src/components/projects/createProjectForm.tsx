/* eslint-disable react/react-in-jsx-scope */
import { SubmitHandler, useForm } from "react-hook-form"
import { useClientUser, useProject } from "../../hooks";

type Inputs = {
    title: string;
    description: string;
};

export function CreateProjectForm() {
    const { clientUser } = useClientUser();
    const { createProject } = useProject();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        if(!clientUser) return;
        createProject(data.title, data.description, clientUser.id); 
        reset();
    }

    if (!clientUser) return;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="pt-8 pb-1" htmlFor="name">Title* {errors.title && <span>This field is required</span>}</label>
            <input className="input input-bordered input-primary w-full mb-6" {...register("title", { required: true })} />

            <label className="pt-8 pb-1" htmlFor="name">Description* {errors.description && <span>This field is required</span>}</label>
            <input className="input input-bordered input-primary w-full mb-10" {...register("description", { required: true })} />
            
            {/* TODO: lägg till taggar */}

            <button className="btn btn-primary mb-4 w-full" type="submit">Submit</button>
        </form>
    )
}