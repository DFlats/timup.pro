/* eslint-disable react/react-in-jsx-scope */
import { Tag, TagType } from "../../types";
import { TagElement, TagElementProps } from "../../components/tags";

interface Props {
    tags: Tag[],
    tagType: TagType,
    onRemoveTag?: (tag: Tag) => void
}

export function TagContainerCompact({ tags, tagType, onRemoveTag }: Props) {
    const noTagsTag = () => {
        switch (tagType) {
            case 'skill':
                return <TagElement
                    tag={{ title: 'Eager to learn', kind: 'skill' } as Tag} />
            case 'interest':
                return <TagElement
                    tag={{ title: 'Interested in everything', kind: 'interest' } as Tag} />
        }
    }

    const tagProps = (tag: Tag) => {
        return {
            tag,
            onClick: onRemoveTag ? (tag: Tag) => onRemoveTag(tag) : null
        } as TagElementProps;
    };

    return (
        <div className='rounded-xl bg-opacity-5 bg-white p-3 m-2'>
            <div className="flex flex-row flex-wrap">
                {tags.length > 0 &&
                    tags.map((tag, i) => <TagElement key={i} {...tagProps(tag)} />)
                }
                {tags.length == 0 && noTagsTag()}
            </div>
        </div>
    )
}