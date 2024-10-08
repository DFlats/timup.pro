/* eslint-disable react/react-in-jsx-scope */
import { Tag, TagType } from "../../types";
import { TagElement, TagElementProps } from "../../components/tags";

interface Props {
    tags: Tag[],
    tagType: TagType,
    onRemoveTag?: (tag: Tag) => void
}

export function TagContainer({ tags, tagType, onRemoveTag }: Props) {
    const heading = () => {
        switch (tagType) {
            case 'skill': return 'Required Skills'
            case 'interest': return 'Topics'
        }
    }

    const tagProps = (tag: Tag) => {
        return {
            tag,
            onClick: onRemoveTag ? (tag: Tag) => onRemoveTag(tag) : null
        } as TagElementProps;
    };

    return (
        <div className='rounded-xl border border-white border-opacity-10 bg-opacity-5 bg-white p-3 mb-2 h-[7.5rem]'>
            <h2>{heading()}</h2>
            <div className="flex flex-row overflow-x-auto no-scrollbar">
                {tags.length > 0 &&
                    tags.map((tag, i) => <TagElement key={i} {...tagProps(tag)} />)
                }
            </div>
        </div>
    )
}