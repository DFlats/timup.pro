/* eslint-disable react/react-in-jsx-scope */
import { useRef } from 'react';
import { TagContainer } from '../../components/tags';
import { TagType } from '../../types';

interface Props {
    tags: string[],
    tagType: TagType
    onAddTag: (tag: string, tagType: TagType) => void,
    onRemoveTag: (tag: string, tagType: TagType) => void,
}

export function TagEditor({ tags, tagType, onAddTag, onRemoveTag }: Props) {
    const inputSkillRef = useRef<HTMLInputElement>(null);
    const addSkillRef = useRef<HTMLButtonElement>(null);

    const handleAddTag = () => {
        const value = inputSkillRef!.current?.value;
        if (!value) return;

        onAddTag(value, tagType);

        inputSkillRef.current.value = '';
        inputSkillRef.current.focus();
    }

    const placeHolder = () => {
        switch (tagType) {
            case 'skill': return 'What are you good at?';
            case 'interest': return 'What are you interested in?'
        }
    }

    return (
        <div
            className="flex flex-col">
            <TagContainer
                tags={tags}
                tagType={tagType}
                onRemoveTag={onRemoveTag}
            />

            <div className="flex flex-row">
                <input
                    ref={inputSkillRef}
                    type='text'
                    placeholder={placeHolder()}
                    className="input input-bordered w-full max-w-xs"
                />

                <button
                    ref={addSkillRef}
                    className='btn m-4'
                    onClick={handleAddTag}>
                    Add Skill
                </button>
            </div>
        </div>
    );
}