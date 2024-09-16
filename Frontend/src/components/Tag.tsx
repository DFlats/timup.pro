/* eslint-disable react/react-in-jsx-scope */
interface TagProps {
    tagText: string,
    type: 'skill' | 'interest'
}

export default function Tag({ tagText, type }: TagProps) {
    const color = type == 'skill' ? 'bg-amber-600' : 'bg-slate-600';
    return (
        <div className={`rounded-full p-1 pr-4 pl-4 m-2 text-white ${color}`}>{tagText}</div>
    );
}