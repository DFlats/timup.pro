/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "react";

interface Props {
    children?: ReactNode,
}

export function ProjectFeed({ children }: Props) {
    return (
        <div className="flex flex-col items-center ">
            {children}
        </div>
    )
}