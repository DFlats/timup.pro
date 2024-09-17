/* eslint-disable react/react-in-jsx-scope */

import { Project } from "../api/types";
import TagButton from "./TagButton";

interface Props {
    project: Project
}

export default function ProjectCard({ project }: Props) {
    const skillTags =
        project.description.tags
            ? project.description.tags.map(tag => <TagButton key={0} tag={tag} type='skill' />)
            : null;

    return (
        <div className="m-4 card bg-base-100 image-full w-96 shadow-xl">
            <figure>
                <img
                    src="https://storage.googleapis.com/pod_public/1300/141876.jpg"
                    alt="Floating Island" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description.text}</p>
                <div className="flex flex-row">
                    {skillTags}
                </div>
                <div className="card-actions justify-end">
                </div>
            </div>
        </div>
    );
}