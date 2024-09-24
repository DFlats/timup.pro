/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "react";

interface Props {
    children?: ReactNode,
}

export function ProjectFeed({ children }: Props) {
    return (
        <div className="p-12 w-screen flex flex-col items-center justify-center">
            {children}
        </div>
    )
}