/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "@tanstack/react-router";

interface Props {
    children?: ReactNode,
}

export function Card({ children}: Props) {
    return (
        <div className='card bg-base-300 w-[420px] h-[650px] shadow-xl "w-full hover:transition duration-100 hover:scale-105'>
            <div className="card-body justify-between">
                {children}
            </div>
        </div>
    )
}