import { Tag } from "../api/types";

/* eslint-disable react/react-in-jsx-scope */
interface TagProps {
    tag: Tag,
    type: 'skill' | 'interest'
    onClick?: (tag: Tag) => void
}

export default function TagButton({ tag, type, onClick }: TagProps) {
    const color = type == 'skill' ? 'bg-amber-600' : 'bg-slate-600';

    const handleClick = onClick ? () => onClick(tag) : () => undefined;

    return (
        <div
            className={`rounded-full p-1 px-4 m-2 text-white ${color}`}
            onClick={() => handleClick()}>
            {tag.tagValue}
        </div>
    );
}