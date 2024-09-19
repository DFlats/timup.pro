/* eslint-disable react/react-in-jsx-scope */
import { SubmitHandler, useForm } from "react-hook-form"
import { useProjects, useUsers } from "../../hooks";
import { useNavigate } from "@tanstack/react-router";
import { TagEditor } from "../tags";
import { useState } from "react";
import { TagType } from "../../types";

type Inputs = {
    title: string;
    description: string;
};

export function CreateProjectForm() {
    const { clientUser } = useUsers({ type: 'clientUser' });
    const navigate = useNavigate();
    const { createProject } = useProjects({ type: 'projectsOwnedByClientUser' });
    const [skillTags, setSkillTags] = useState<string[]>([]);
    const [interestTags, setInterestTags] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const handleAddTag = (tag: string, tagType: TagType) => {
        switch (tagType) {
            case 'skill':
                setSkillTags([...skillTags, tag]);
                break;
            case 'interest':
                setInterestTags([...interestTags, tag]);
        }
    }

    const handleRemoveTag = (tag: string, tagType: TagType) => {
        switch (tagType) {
            case 'skill':
                setSkillTags(skillTags.filter(t => t != tag));
                break;
            case 'interest':
                setInterestTags(interestTags.filter(t => t != tag));
        }
    }

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
    }

    if (!clientUser) return;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="pt-8 pb-1" htmlFor="name">Title* {errors.title && <span>This field is required</span>}</label>
            <input className="input input-bordered input-primary w-full mb-6" {...register("title", { required: true })} />

            <label className="pt-8 pb-1" htmlFor="name">Description* {errors.description && <span>This field is required</span>}</label>
            <input className="input input-bordered input-primary w-full mb-10" {...register("description", { required: true })} />
            <TagEditor
                tags={skillTags}
                tagType='skill'
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag} />
            <TagEditor
                tags={skillTags}
                tagType='interest'
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag} />
            <button className="btn btn-primary mb-4 w-full" type="submit">Submit</button>
        </form>
    )
}