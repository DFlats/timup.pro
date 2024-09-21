/* eslint-disable react/react-in-jsx-scope */
interface Props {
    title: string
}

export function CardTitle({ title }: Props) {
    return <h3 className="card-title pb-4">{title}</h3>
}