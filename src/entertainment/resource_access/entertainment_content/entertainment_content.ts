
import { Note } from '../../../common/note';
import { entertainmentContentsPath } from './entertainment_content_resource_access';

export const EntertainmentContentKinds = ["tv", "movie", "video_game", "playlist", "album", "music_video", "song", "concert", "board_game", "live_sporting_event"] as const;
export type EntertainmentContentKind = typeof EntertainmentContentKinds[number];

export const EntertainmentContentStates = ["not_started", "in_progress", "finished"] as const;
export type EntertainmentContentState = typeof EntertainmentContentStates[number];

export const EntertainmentContentAnticipations = ["none", "low", "medium", "high"] as const;
export type EntertainmentContentAnticipation = typeof EntertainmentContentAnticipations[number];

export class EntertainmentContent extends Note {
    readonly kind: EntertainmentContentKind;
    readonly state: EntertainmentContentState;
    readonly anticipation: EntertainmentContentAnticipation;
    readonly rating?: number;

    constructor(name: string, kind: EntertainmentContentKind, state: EntertainmentContentState, anticipation: EntertainmentContentAnticipation, rating?: number) {
        super(name, entertainmentContentsPath);
        this.kind = kind;
        this.state = state;
        this.anticipation = anticipation;
        this.rating = rating;
    }
}
