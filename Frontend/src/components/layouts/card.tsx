/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "@tanstack/react-router";

interface Props {
    children?: ReactNode
}

export function Card({ children }: Props) {
    return (
        <div className='card bg-base-300 w-[420px] h-[700px] shadow-xl'>
            <div className="card-body justify-between">
                {children}
            </div>
        </div>
    )
}