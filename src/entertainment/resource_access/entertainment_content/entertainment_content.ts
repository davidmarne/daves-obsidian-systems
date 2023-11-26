
import { Note } from '../../../common/note';
import { entertainmentContentsPath } from './entertainment_content_resource_access';

export const EntertainmentContentKinds = ["tv", "movie", "video_game", "playlist", "album", "music_video", "song", "concert", "board_game", "live_sporting_event"] as const;
export type EntertainmentContentKind = typeof EntertainmentContentKinds[number];

export const EntertainmentContentStates = ["not_started", "in_progress", "finished"] as const;
export type EntertainmentContentState = typeof EntertainmentContentStates[number];

interface EntertainmentContentStateValue {
    state: EntertainmentContentState,
}

interface NotStarted extends EntertainmentContentStateValue {
    state: "not_started",
    anticipation: "low" | "medium" | "high",
}

interface InProgress extends EntertainmentContentStateValue {
    state: "in_progress",
}

interface Finished extends EntertainmentContentStateValue {
    state: "finished",
    rewind: boolean,
    rating: number
}

export const newEntertainmentContentStateValue = (state: EntertainmentContentState): NotStarted | InProgress | Finished => {
    switch (state) {
        case "not_started":
            return {
                state: "not_started",
                anticipation: "medium",
            }
        case "in_progress":
            return {
                state: "in_progress",
            }
        case "finished":
            return {
                state: "finished",
                rewind: false,
                rating: 0,
            }
    }
}

export class EntertainmentContent extends Note {
    readonly kind: EntertainmentContentKind;
    readonly state: EntertainmentContentStateValue;

    constructor(name: string, kind: EntertainmentContentKind, state: EntertainmentContentStateValue) {
        super(name, entertainmentContentsPath);
        this.kind = kind;
        this.state = state;
    }
}
