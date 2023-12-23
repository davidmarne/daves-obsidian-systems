
import { Note } from '../../../common/note';

export const Instruments = ["guitar", "synth", "drums"] as const;
export type Instrument = typeof Instruments[number];

export const defaultPracticeExercise = () => ({
    directory: 'music/practice_exercise/',
    instrument: Instruments[0],
    source: '',
    description: '',
});

export interface PracticeExercise extends Note {
    readonly directory: 'music/practice_exercise/';
    readonly instrument: Instrument;
    readonly source?: string;
    readonly description: string;
}
