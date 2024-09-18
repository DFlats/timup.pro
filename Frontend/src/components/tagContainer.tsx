/* eslint-disable react/react-in-jsx-scope */
import { TagType } from "../types";
import { Tag } from "../components";

interface Props {
    tags: string[],
    tagType: TagType
}

export function TagContainer({ tags, tagType }: Props) {
    return (<div className="flex flex-row flex-wrap">
        {tags.map(tag => <Tag key={tag} tag={tag} tagType={tagType} />)}
    </div>
    )
}