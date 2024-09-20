import { ReactNode } from "react"

/* eslint-disable react/react-in-jsx-scope */
interface Props {
    children?: ReactNode
}

export function CardFooter({ children }: Props) {
    return (
        <div className="card-actions justify-end">
            {children}
        </div>
    )
}