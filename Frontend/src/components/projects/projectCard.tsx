/* eslint-disable react/react-in-jsx-scope */
import { Link } from "@tanstack/react-router";
import { TagContainer } from "../tags";
import { Card } from "../layouts/card";
import { CardDescription, CardFooter, CardTitle } from "../layouts";
import { Project } from "../../types/projects";

interface Props {
    project: Project
}

export function ProjectCard({ project }: Props) {
    return (
        <Link to='/project/$id' params={{ id: project.id.toString() }}>
            <Card>
                <div className="h-1/2">
                    <CardTitle title={project.title} />
                    <CardDescription>
                        {project.description}
                    </CardDescription>
                </div>
                <div className="h-1/2">
                    <div className="mb-2">
                        <p>{`Collaborators: ${project.collaborators.length}`}</p>
                    </div>
                    <TagContainer tags={project.tags['skill']} tagType={'skill'} />
                    <TagContainer tags={project.tags['interest']} tagType={'interest'} />
                    <CardFooter>
                        {`Initiated by ${project.authorName}`}
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
}