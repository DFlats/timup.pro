/* eslint-disable react/react-in-jsx-scope */
import { TagType } from "../types/types";

interface Props {
    tag: string,
    tagType: TagType
    onClick?: (tag: string) => void
}

export function Tag({ tag, tagType, onClick }: Props) {
    const color = tagType == 'skill' ? 'bg-amber-600' : 'bg-slate-600';

    const handleClick = onClick ? () => onClick(tag) : () => undefined;

    return (
        <button
            className={`btn rounded-full m-2 text-white ${color}`}
            onClick={() => handleClick()}>
            {tag}
        </button>
    );
}