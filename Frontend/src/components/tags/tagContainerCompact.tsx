/* eslint-disable react/react-in-jsx-scope */
import { Tag, TagType } from "../../types";
import { TagElement, TagElementProps } from "../../components/tags";

interface Props {
    tags: Tag[],
    tagType: TagType,
    onRemoveTag?: (tag: Tag) => void
}

export function TagContainerCompact({ tags, tagType, onRemoveTag }: Props) {
    const tagProps = (tag: Tag) => {
        return {
            tag,
            onClick: onRemoveTag ? (tag: Tag) => onRemoveTag(tag) : null
        } as TagElementProps;
    };

    const noTagsTag = () => {
        switch (tagType) {
            case 'skill':
                return <TagElement
                    tag={{ title: 'Eager to learn', kind: 'skill' } as Tag} />
            case 'interest':
                return <TagElement
                    tag={{ title: 'Eager to learn', kind: 'skill' } as Tag} />
        }
    }

    return (
        <div className="flex flex-row flex-wrap">
            {tags.length > 0 &&
                tags.map((tag, i) => <TagElement key={i} {...tagProps(tag)} />)
            }
            {tags.length == 0 && noTagsTag()}
        </div>
    )
}