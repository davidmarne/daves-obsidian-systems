
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { entertainmentContentsPath } from './entertainment_content_resource_access';

type EntertainmentContentKind = "tv" | "movie" | "video_game" | "playlist" | "album" | "music_video" | "song" | "concert" | "board_game" | "live_sporting_event";
type EntertainmentContentKinds = ["tv", "movie", "video_game", "playlist", "album", "music_video", "song", "concert", "board_game", "live_sporting_event"];

type EntertainmentContentState = "not_started" | "in_progress" | "finished";
type EntertainmentContentStates = ["not_started", "in_progress", "finished"];

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

export class EntertainmentContent extends Note {
    readonly kind: EntertainmentContentKind;
    readonly state: EntertainmentContentStateValue;

    constructor(name: string) {
        super(name, entertainmentContentsPath);
    }
}
