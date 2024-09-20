/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState } from 'react';
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
    const [inputValue, setInputValue] = useState<string>('');  // Track input value with state

    const handleAddTag = () => {
        const value = inputSkillRef!.current?.value;
        if (!value) return;

        onAddTag(value, tagType);

        setInputValue('');  // Clear input value after adding the tag
        inputSkillRef.current!.value = '';  // Reset the ref value
        inputSkillRef.current!.focus();
    }

    const placeHolder = () => {
        switch (tagType) {
            case 'skill': return 'What are you good at?';
            case 'interest': return 'What are you interested in?';
        }
    }

    const submitLabel = () => {
        switch (tagType) {
            case 'skill': return 'Add Skill';
            case 'interest': return 'Add Interest';
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);  // Update the input value in state on change
    }

    return (
        <div className="my-4 gap-2 flex flex-col">
            <TagContainer
                tags={tags}
                tagType={tagType}
                onRemoveTag={onRemoveTag}
            />

            <div className="flex flex-row">
                <input
                    ref={inputSkillRef}
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}  // Handle input changes
                    placeholder={placeHolder()}
                    className="input input-bordered w-full max-w-xs"
                />

                <button
                    className={`btn m-4 ${inputValue === '' ? 'btn-disabled' : ''}`}  // Disable button if input is empty
                    onClick={handleAddTag}
                >
                    {submitLabel()}
                </button>
            </div>
        </div>
    );
}   