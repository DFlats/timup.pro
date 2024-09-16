/* eslint-disable react/react-in-jsx-scope */
interface TagProps {
    tagText: string,
    type: 'skill' | 'interest'
}

export default function Tag({ tagText, type } : TagProps) {
    const color = type == 'skill' ? 'bg-amber' : 'bg-slate-600';
    return (
        <div className={`rounded-full ${color}`}>{tagText}</div>
    );
}