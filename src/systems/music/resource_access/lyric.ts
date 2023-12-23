
import { Note } from '../../../common/note';
import { MusicProject } from './project';
import { Reference } from 'src/systems/travel/resource_access/location';

type LyricKind = "hook" | "verse" | "concept" | "bar";
type LyricKinds = ["hook", "verse", "concept", "bar"];

export interface Lyric extends Note {
    readonly directory: 'music/lyric/'
    readonly kind: LyricKind;
    readonly projects: Reference<MusicProject>[];
    readonly content: string;
}
