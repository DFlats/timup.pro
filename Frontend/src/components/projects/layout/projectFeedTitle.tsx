/* eslint-disable react/react-in-jsx-scope */
interface Props {
    title: string,
}

export function ProjectFeedTitle({ title }: Props) {
    return <h2 className='text-5xl mb-8'>{title}</h2>
}