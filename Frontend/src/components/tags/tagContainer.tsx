/* eslint-disable react/react-in-jsx-scope */
import { TagType } from "../../types";
import { Tag, TagProps } from "../../components/tags";

interface Props {
    tags: string[],
    tagType: TagType,
    onRemoveTag?: (tag: string, tagType: TagType) => void
}

export function TagContainer({ tags, tagType, onRemoveTag }: Props) {
    const tagProps = (tag: string) => {
        return {
            tag,
            tagType,
            onClick: onRemoveTag ? (tag: string) => onRemoveTag(tag, tagType) : null
        } as TagProps;
    };

    return (
        <>
            <div className="flex flex-row flex-wrap">
                {tags.map(tag => <Tag key={tag} {...tagProps(tag)} />)}
            </div>
        </>
    )
}