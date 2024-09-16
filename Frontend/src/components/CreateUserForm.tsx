/* eslint-disable react/react-in-jsx-scope */

import { SubmitHandler, useForm } from "react-hook-form"
import useClientUser from '../hooks/useClientUser';
import TagButton from "./Tag";

type Inputs = {
    skillTagValue: string,
}

export default function CreateUserForm() {
    const { clientUser, addTag, removeTag } = useClientUser();

    if (!clientUser) return;

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = ({ skillTagValue }: Inputs) =>
        addTag({
            id: 0,
            tagValue: skillTagValue,
        });

    const tagButtons = clientUser.tags?.map((tag, i) =>
        <TagButton
            key={i}
            tag={tag}
            onClick={(tag) => { removeTag(tag) }}
            type='skill'
        />);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row">
                {tagButtons}
            </div>
            <input type='text' {...register('skillTagValue')} />
            <button type='submit'>Add Skill</button>
        </form>
    );
}