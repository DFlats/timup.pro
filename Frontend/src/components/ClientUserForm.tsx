/* eslint-disable react/react-in-jsx-scope */

import { useRef } from 'react';
import useClientUser from '../hooks/useClientUser';
import TagButton from "./TagButton";


export default function ClientUserForm() {
    const { clientUser, addTag, removeTag } = useClientUser();
    const inputSkillRef = useRef<HTMLInputElement>(null);

    if (!clientUser) return;

    const handleAddTag = () => {
        const value = inputSkillRef!.current?.value;
        if (!value) return;

        return addTag({
            id: 0,
            tagValue: value,
        });
    }

    const tagButtons = clientUser.tags?.map((tag, i) =>
        <TagButton
            key={i}
            tag={tag}
            onClick={(tag) => { removeTag(tag) }}
            type='skill'
        />);

    return (<div className='py-4'>
        <h2 className="text-lg text-bold">Your skills</h2>
        <hr />
        <div className="flex flex-row w-full">
            {tagButtons}
        </div>
        <input ref={inputSkillRef} type='text' placeholder="New skill" className="input input-bordered w-full max-w-xs" />
        <button className='btn m-4' onClick={handleAddTag}>Add Skill</button>
    </div>
    );
}