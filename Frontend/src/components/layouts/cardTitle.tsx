/* eslint-disable react/react-in-jsx-scope */
interface Props {
    title: string
}

export function CardTitle({ title }: Props) {
    return <h2 className="card-title text-3xl">{title}</h2>
}