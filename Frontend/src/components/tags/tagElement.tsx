/* eslint-disable react/react-in-jsx-scope */
import { Tag } from "../../types";

export interface TagElementProps {
    tag: Tag,
    onClick?: (tag: Tag) => void
}

export function TagElement({ tag, onClick }: TagElementProps) {
    const color = tag.kind == 'skill' ? 'bg-amber-600' : 'bg-slate-600';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!onClick) return;

        onClick(tag);
    }

    return (
        <button
            className={`btn rounded-full m-2 text-white ${color}`}
            onClick={(e) => handleClick(e)}>
            <p>{tag.title}</p>
        </button>
    );
}