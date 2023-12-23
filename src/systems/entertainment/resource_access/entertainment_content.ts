
import { Note } from '../../../common/note';
import { MarkdownString } from 'src/common/ast';

export const EntertainmentContentKinds = ["tv", "movie", "video_game", "playlist", "album", "music_video", "song", "concert", "board_game", "live_sporting_event"] as const;
export type EntertainmentContentKind = typeof EntertainmentContentKinds[number];

export const EntertainmentContentStates = ["not_started", "in_progress", "finished"] as const;
export type EntertainmentContentState = typeof EntertainmentContentStates[number];

export const EntertainmentContentAnticipations = ["none", "low", "medium", "high"] as const;
export type EntertainmentContentAnticipation = typeof EntertainmentContentAnticipations[number];

export const defaultEntertainmentContent = (): EntertainmentContent => ({
    directory: 'entertainment/entertainment_content/',
    name: '',
    kind: EntertainmentContentKinds[0],
    state: EntertainmentContentStates[0],
    anticipation: EntertainmentContentAnticipations[0],
    rating: 0,
    description: '',
});

export interface EntertainmentContent extends Note {
    readonly directory: 'entertainment/entertainment_content/',
    readonly kind: EntertainmentContentKind,
    readonly state: EntertainmentContentState,
    readonly anticipation: EntertainmentContentAnticipation,
    readonly rating: number,
    readonly description: MarkdownString,
}
