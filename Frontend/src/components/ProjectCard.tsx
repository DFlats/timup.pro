/* eslint-disable react/react-in-jsx-scope */

import { Project } from "../api/types";
import Tag from "./Tag";

interface Props {
    project: Project
}

export default function ProjectCard({ project }: Props) {
    const skillTags =
        project.description.tags
            ? project.description.tags.map(tag => <Tag key={0} tagText={tag.tagValue} type='skill' />)
            : null;

    return (
        <div className="m-4 card bg-base-100 image-full w-96 shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description.text}</p>
                <div className="flex flex-row">
                    {skillTags}
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}