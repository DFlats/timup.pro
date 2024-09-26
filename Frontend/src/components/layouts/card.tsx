/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "@tanstack/react-router";

interface Props {
    children?: ReactNode,
}

export function Card({ children }: Props) {
    return (
        <div className='card bg-base-300 w-[420px] h-[680px] "w-full hover:transition duration-100 hover:scale-105 hover:z-10 shadow-md shadow-gray-600  border border-white border-opacity-10 '>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}