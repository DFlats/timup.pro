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
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        
        const value = inputSkillRef!.current?.value;
        if (!value) return;

        onAddTag(value, tagType);

        setInputValue('');
        inputSkillRef.current!.value = ''; 
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
        setInputValue(e.target.value); 
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
                    onChange={handleInputChange} 
                    placeholder={placeHolder()}
                    className="input input-bordered w-full max-w-xs"
                />

                <button
                    className={`btn m-4 ${inputValue === '' ? 'btn-disabled' : ''}`}  
                    onClick={(e) => handleAddTag(e)}
                >
                    {submitLabel()}
                </button>
            </div>
        </div>
    );
}   