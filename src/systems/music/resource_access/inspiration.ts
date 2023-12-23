
import { Reference } from 'src/systems/travel/resource_access/location';
import { Note } from '../../../common/note';
import { MusicProject } from './project';

export const InspirationKinds = ["sample", "reference_track", "dj_set", "sound", "effect", "composition_technique", "melody", "bass_line", "drum_pattern", "chord_progression", "lyric_concept"] as const;
export type InspirationKind = typeof InspirationKinds[number];

export const defaultInspiration = () => ({
    directory: 'music/inspiration/',
    kind: InspirationKinds[0],
    projects: [],
    source: '',
    description: '',
})

export interface Inspiration extends Note {
    readonly directory: 'music/inspiration/'
    readonly kind: InspirationKind;
    readonly projects: Reference<MusicProject>[];
    readonly source?: string;
    readonly description: string;
}
