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
                <CardTitle title={project.title} />
                <CardDescription>
                    {project.description}
                </CardDescription>
                <TagContainer tags={project.skillTags} tagType={'skill'} />
                <TagContainer tags={project.interestTags} tagType={'interest'} />
                <CardFooter>
                    {`Initiated by ${project.authorName}`}
                </CardFooter>
            </Card>
        </Link>
    );
}