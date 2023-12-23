
import { Note } from '../../../common/note';

export const ProjectKinds = ["djset", "single", "ep", "mixtape", "lp"] as const;
export type ProjectKind = typeof ProjectKinds[number];

export const defaultMusicProject = () => ({
    directory: 'music/project/',
    kind: ProjectKinds[0],
    description: ''
});

export interface MusicProject extends Note {
    readonly directory: 'music/project/';
    readonly kind: ProjectKind;
    readonly description: string;
}
