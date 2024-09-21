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

    const heading = () => {
        switch (tagType) {
            case 'skill': return 'Skills'
            case 'interest': return 'Interests'
        }
    }

    const noTagsTag = () => {
        switch (tagType) {
            case 'skill': return <Tag tag="Eager to learn!" tagType='skill' onClick={() => event?.preventDefault()} />
            case 'interest': return <Tag tag="Curious about everything!" tagType='interest' onClick={() => event?.preventDefault()} />
        }
    }

    return (
        <div className='rounded-xl bg-opacity-5 bg-white p-3 m-2'>
            <h2>{heading()}</h2>
            <div className="flex flex-row flex-wrap">
                {tags.length > 0 &&
                    tags.map((tag, i) => <Tag key={i} {...tagProps(tag)} />)
                }
                {tags.length == 0 && noTagsTag()}
            </div>
        </div>
    )
}