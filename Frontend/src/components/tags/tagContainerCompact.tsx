/* eslint-disable react/react-in-jsx-scope */
import { TagType } from "../../types";
import { Tag, TagProps } from "../../components/tags";

interface Props {
    tags: string[],
    tagType: TagType,
    onRemoveTag?: (tag: string, tagType: TagType) => void
}

export function TagContainerCompact({ tags, tagType, onRemoveTag }: Props) {
    const tagProps = (tag: string) => {
        return {
            tag,
            tagType,
            onClick: onRemoveTag ? (tag: string) => onRemoveTag(tag, tagType) : null
        } as TagProps;
    };

    const noTagsTag = () => {
        switch (tagType) {
            case 'skill': return <Tag tag="Eager to learn!" tagType='skill' onClick={() => event?.preventDefault()} />
            case 'interest': return <Tag tag="Curious about everything!" tagType='interest' onClick={() => event?.preventDefault()} />
        }
    }

    return (
        <div className="flex flex-row flex-wrap">
            {tags.length > 0 &&
                tags.map(tag => <Tag key={tag} {...tagProps(tag)} />)
            }
            {tags.length == 0 && noTagsTag()}
        </div>
    )
}