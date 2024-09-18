/* eslint-disable react/react-in-jsx-scope */
interface TagProps {
    tagText: string,
    type: 'skill' | 'interest'
    onClick?: (tag: string) => void
}

export default function TagButton({ tagText, type, onClick }: TagProps) {
    const color = type == 'skill' ? 'bg-amber-600' : 'bg-slate-600';

    const handleClick = onClick ? () => onClick(tagText) : () => undefined;

    return (
        <button
            className={`btn rounded-full m-2 text-white ${color}`}
            onClick={() => handleClick()}>
            {tagText}
        </button>
    );
}