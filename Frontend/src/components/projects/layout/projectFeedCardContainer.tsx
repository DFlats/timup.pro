/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "react";

interface Props {
    children?: ReactNode,
}

export function ProjectFeedCardContainer({ children }: Props) {
    return (
        <div className='flex flex-row flex-wrap justify-center gap-4 p-12'>
            {children}
        </div>
    )
}