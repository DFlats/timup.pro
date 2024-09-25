/* eslint-disable react/react-in-jsx-scope */
import { Tag } from "../../types";
import { TagElement, TagElementProps } from "../../components/tags";

interface Props {
    tags: Tag[],
    onRemoveTag?: (tag: Tag) => void
}

export function TagContainerCompact({ tags, onRemoveTag }: Props) {
    const tagProps = (tag: Tag) => {
        return {
            tag,
            onClick: onRemoveTag ? (tag: Tag) => onRemoveTag(tag) : null
        } as TagElementProps;
    };
    
    return (
        <div className='rounded-xl bg-opacity-5 bg-white p-3'>
            <div className="flex flex-row flex-wrap">
                {tags.length > 0 &&
                    tags.map((tag, i) => <TagElement key={i} {...tagProps(tag)} />)
                }
            </div>
        </div>
    )
}