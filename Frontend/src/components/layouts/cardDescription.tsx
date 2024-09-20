/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "react"

interface Props {
    children?: ReactNode
}

export function CardDescription({ children }: Props) {
    return (
        <div className='max-w-full'>
            {children}
        </div>
    )
}