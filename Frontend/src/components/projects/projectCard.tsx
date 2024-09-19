/* eslint-disable react/react-in-jsx-scope */

import { Link } from "@tanstack/react-router";
import { Project } from "../../api";
import { TagContainer } from "../tags";

interface Props {
    project: Project
}

export function ProjectCard({ project }: Props) {
    return (
        <Link className="m-4 card bg-base-100 image-full w-96 shadow-xl" to='/project/$id' params={{
            id: project.id.toString(),
        }}
        >
            <figure>
                <img
                    src="https://storage.googleapis.com/pod_public/1300/141876.jpg"
                    alt="Floating Island" />

            </figure>
            <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description}</p>
                <TagContainer tags={project.skillTags} tagType={'skill'} />
                <TagContainer tags={project.interestTags} tagType={'interest'} />
                <div className="card-actions justify-end">
                    <p>{`Initiated by ${project.authorName}`}</p>
                </div>
            </div>
        </Link>
    );
}