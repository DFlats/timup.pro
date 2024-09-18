/* eslint-disable react/react-in-jsx-scope */

import { useRef } from 'react';
import { Tag } from '.';
import { useClientUser } from '../hooks';

export function ClientUserForm() {
    const { clientUser, addTag, removeTag } = useClientUser();
    const inputSkillRef = useRef<HTMLInputElement>(null);
    const addSkillRef = useRef<HTMLButtonElement>(null);

    if (!clientUser) return;

    const handleAddTag = () => {
        const value = inputSkillRef!.current?.value;
        if (!value) return;

        addTag(value, true);

        inputSkillRef.current.value = '';
        inputSkillRef.current.focus();
    }

    const tagButtons = clientUser.skillTags?.map((tag, i) =>
        <Tag
            key={i}
            tag={tag}
            onClick={(tag) => { removeTag(tag, true) }}
            tagType='skill'
        />);

    return (<div className='py-4'>
        <h2 className="text-lg text-bold">Your skills</h2>
        <hr />
        <div className="flex flex-row w-full flex-wrap">
            {tagButtons}
        </div>
        <input ref={inputSkillRef} type='text' placeholder="New skill" className="input input-bordered w-full max-w-xs" />
        <button ref={addSkillRef} className='btn m-4' onClick={handleAddTag}>Add Skill</button>
    </div>
    );
}