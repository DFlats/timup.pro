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
            className={`${onClick ? "btn" : "p-4 pointer-events-none"} rounded-full m-2 whitespace-nowrap text-white ${color}`}
            onClick={(e) => handleClick(e)}>
            <p>{`${tag.title}${tag.count ? ` ${`😶`.repeat(tag.count)}` : ''}`}</p>
        </button>
    );
}