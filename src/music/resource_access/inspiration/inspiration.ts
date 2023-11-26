
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { Project } from '../project/project';
import { inspirationsPath } from './inspiration_resource_access';

type InspirationKind = "sample" | "reference_track" | "dj_set" | "sound" | "effect" | "composition_technique" | "melody" | "bass_line" | "drum_pattern" | "chord_progression" | "lyric_concept";
type InspirationKinds = ["sample", "reference_track", "dj_set", "sound", "effect", "composition_technique", "melody", "bass_line", "drum_pattern", "chord_progression", "lyric_concept"];

export class Inspiration extends Note {
    readonly kind: InspirationKind;
    readonly projects: string[];

    constructor(name: string) {
        super(name, inspirationsPath);
    }
}
