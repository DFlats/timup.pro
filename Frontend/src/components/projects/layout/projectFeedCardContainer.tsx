/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "react";

interface Props {
    children?: ReactNode,
}

export function ProjectFeedCardContainer({ children }: Props) {
    return (
        <div className='flex flex-row flex-wrap gap-4'>
            {children}
        </div>
    )
}