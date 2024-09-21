/* eslint-disable react/react-in-jsx-scope */
import { TagType } from "../../types/misc";

export interface TagProps {
    tag: string,
    tagType: TagType
    onClick?: (tag: string) => void
}

export function Tag({ tag, tagType, onClick }: TagProps) {
    const color = tagType == 'skill' ? 'bg-amber-600' : 'bg-slate-600';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!onClick) return;

        onClick(tag);
    }

    return (
        <button
            className={`btn rounded-full m-2 text-white ${color}`}
            onClick={(e) => handleClick(e)}>
            <p>{tag}</p>
        </button>
    );
}