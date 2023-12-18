
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { MusicProject } from '../project/project';
import { lyricsPath } from './lyric_resource_access';

type LyricKind = "hook" | "verse" | "concept" | "bar";
type LyricKinds = ["hook", "verse", "concept", "bar"];

export class Lyric extends Note {
    readonly kind: LyricKind;
    readonly projects: string[];

    constructor(name: string) {
        super(name, lyricsPath);
    }
}
