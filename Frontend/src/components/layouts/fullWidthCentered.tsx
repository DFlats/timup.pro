/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

export function FullWidthCentered({ children }: Props) {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            {children}
        </div>
    )
}