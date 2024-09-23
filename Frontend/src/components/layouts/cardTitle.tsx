/* eslint-disable react/react-in-jsx-scope */
interface Props {
    title: string
}

export function CardTitle({ title }: Props) {
    return <h2 className="card-title">{title}</h2>
}