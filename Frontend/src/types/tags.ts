import { TagType } from "./misc";

export type Tags = Record<TagType, Tag[]>

export type Tag = {
    title: string,
    kind: TagType
}