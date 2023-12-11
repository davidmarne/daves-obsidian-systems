
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { Project } from '../project/project';
import { inspirationsPath } from './inspiration_resource_access';

export const InspirationKinds = ["sample", "reference_track", "dj_set", "sound", "effect", "composition_technique", "melody", "bass_line", "drum_pattern", "chord_progression", "lyric_concept"] as const;
export type InspirationKind = typeof InspirationKinds[number];

export class Inspiration extends Note {
    readonly kind: InspirationKind;
    readonly projects: Project[];
    readonly source?: string;
    readonly description: string;

    constructor(name: string, kind: InspirationKind, projects: Project[], source: string, description: string) {
        super(name, inspirationsPath);
        this.kind = kind;
        this.projects = projects;
        this.source = source;
        this.description = description;
    }
}
