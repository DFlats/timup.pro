/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState } from 'react';
import { TagContainer } from '../../components/tags';
import { Tag, Tags, TagType } from '../../types';

interface Props {
    tags: Tags,
    onAddTag: (tag: Tag) => void,
    onRemoveTag: (tag: Tag) => void,
}

const tagKinds: TagType[] = ['skill', 'interest'];

const placeHolders: Record<TagType, string> = {
    'interest': 'What are you interested in?',
    'skill': 'What are you good at?'
};

const submitLabels: Record<TagType, string> = {
    'interest': 'Add Skill',
    'skill': 'Add Interest'
}

export function TagEditor({ tags, onAddTag, onRemoveTag }: Props) {
    const inputRefs = useRef<Record<TagType, HTMLInputElement | undefined>>({
        'interest': undefined,
        'skill': undefined
    });

    const [inputValues, setInputValues] = useState<Record<TagType, string>>({
        'interest': '',
        'skill': ''
    });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tagKind: TagType) => {
        e.preventDefault();

        if (!inputRefs.current[tagKind]) return;

        const value = inputRefs.current[tagKind].value;

        const tag = {
            title: value,
            kind: tagKind
        } as Tag;

        onAddTag(tag);

        const newInputValues = { ...inputValues };
        newInputValues[tagKind] = '';

        setInputValues(newInputValues);

        inputRefs.current[tagKind].focus();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, tagKind: TagType) => {
        const newInputValues = { ...inputValues };
        newInputValues[tagKind] = e.target.value;
        setInputValues(newInputValues);
    }

    return (
        <div className="my-4 gap-2 flex flex-col">
            {tagKinds.map(kind => (
                <>
                    <TagContainer tags={tags[kind]} tagType={kind} onRemoveTag={onRemoveTag} />
                    <div className="flex flex-row">
                        <input
                            ref={(element) => {
                                inputRefs.current[kind] = element!;
                            }}
                            type='text'
                            value={inputValues[kind]}
                            placeholder={placeHolders[kind]}
                            onChange={(e) => handleInputChange(e, kind)}
                            className="input input-bordered w-full max-w-xs"
                        />

                        <button
                            className={`btn m-4 ${inputValues[kind] ?? 'btn-disabled'}`}
                            onClick={(e) => handleSubmit(e, kind)}
                        >
                            {submitLabels[kind]}
                        </button>
                    </div>
                </>))
            }
        </div>
    );
}   