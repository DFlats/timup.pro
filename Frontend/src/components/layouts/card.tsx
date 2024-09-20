/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from "@tanstack/react-router";

interface Props {
    children?: ReactNode,
    backgroundImageUrl?: string
}

export function Card({ children, backgroundImageUrl = "https://storage.googleapis.com/pod_public/1300/141876.jpg" }: Props) {
    return (
        <div className='card bg-base-100 image-full w-96 shadow-xl'>
            <figure>
                <img
                    src={backgroundImageUrl}
                    alt="Floating Island" />
            </figure>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}