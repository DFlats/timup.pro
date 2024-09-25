/* eslint-disable react/react-in-jsx-scope */
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "@tanstack/react-router";
import { TagEditor } from "../tags";
import { useState } from "react";
import { Tag, Tags } from "../../types";
import { useProjectActions } from "../../hooks/projects";
import { useClientUser } from "../../hooks/users";

type Inputs = {
    title: string;
    description: string;
};

const initTags: Tags = {
    'interest': [],
    'skill': []
}

export function CreateProjectForm() {
    const { clientUser } = useClientUser();
    const navigate = useNavigate();
    const { createProjectWithClientAsAuthor } = useProjectActions();
    const [tags, setTags] = useState<Tags>(initTags);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const handleAddTag = (tag: Tag) => {
        const newTags: Tags = { ...tags };
        newTags[tag.kind] = [...newTags[tag.kind], tag];
        setTags(newTags);
    }

    const handleRemoveTag = (tag: Tag) => {
        const newTags: Tags = { ...tags };
        newTags[tag.kind] = newTags[tag.kind].filter(t => t.title != tag.title);
        setTags(newTags);
    }

    const onSubmit: SubmitHandler<Inputs> = async ({ title, description }: Inputs) => {
        if (!clientUser || !createProjectWithClientAsAuthor) return;

        const createdProject = await createProjectWithClientAsAuthor(title, description, tags);

        if (!createdProject) return;

        const modal: HTMLDialogElement = document.getElementById(import.meta.env.VITE_CREATE_PROJECT_MODAL_ID) as HTMLDialogElement;
        modal?.close();

        navigate({
            to: '/project/$id',
            params: { id: createdProject.id.toString() }
        });

        reset();
    }

    if (!clientUser) return;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="pt-8 text-white" htmlFor="name">Title {errors.title && <span className="text-red-500">: This field is required</span>}</label>
            <input className="input input-bordered bg-[#0e132f] w-full mb-6 mt-2 text-cyan-300" placeholder="Enter a catchy title for your project?" {...register("title", { required: true })} />

            <label className="pt-8 text-white" htmlFor="name">Description {errors.description && <span className="text-red-500">: This field is required</span>}</label>
            <textarea className="textarea textarea-bordered bg-[#0e132f] w-full mb-4 mt-2 text-cyan-300 text-base" placeholder="What is the main idea behind your project?" {...register("description", { required: true })} />

            <TagEditor
                tags={tags}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag} />

            <button className="btn btn-primary mb-4 w-full" type="submit" onClick={() => onSubmit}>Submit</button>
        </form>
    )
}