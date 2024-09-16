/* eslint-disable react/react-in-jsx-scope */

import { Project } from "../hooks/useProjects";

interface Props {
    project: Project
}

export default function ProjectCard({ project }: Props) {
    return (
        <div className="card bg-base-100 image-full w-96 shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}