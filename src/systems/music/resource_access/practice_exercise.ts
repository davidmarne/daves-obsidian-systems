
import { Note } from '../../../common/note';

export const Instruments = ["guitar", "synth", "drums"] as const;
export type Instrument = typeof Instruments[number];

export interface PracticeExercise extends Note {
    readonly directory: 'music/practice_exercise/';
    readonly instrument: Instrument;
    readonly source?: string;
    readonly description: string;
}
