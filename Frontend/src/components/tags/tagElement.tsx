/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef } from "react";
import { Tag } from "../../types";

export interface TagElementProps {
    tag: Tag,
    onClick?: (tag: Tag) => void
}

export function TagElement({ tag, onClick }: TagElementProps) {
    const color = tag.kind == 'skill' ? 'bg-amber-600' : 'bg-slate-600';
    const tagRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!tagRef.current) return;
        const buttonWidth = tagRef.current.style.width
        
    }, [tagRef])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!onClick) return;

        onClick(tag);
    }

    return (
        <button
            className={`${onClick ? "btn" : "p-4"} rounded-full m-2 text-white ${color}`}
            onClick={(e) => handleClick(e)}
            ref={tagRef}>
            <p>{tag.title}</p>
        </button>
    );
}