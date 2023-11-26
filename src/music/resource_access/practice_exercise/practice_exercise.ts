
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { practiceExercisesPath } from './practice_exercise_resource_access';


export const Instruments = ["guitar", "synth", "drums"] as const;
export type Instrument = typeof Instruments[number];

export class PracticeExercise extends Note {
    readonly instrument: Instrument;
    readonly source?: string;
    
    constructor(name: string, instrument: Instrument, source?: string) {
        super(name, practiceExercisesPath);
        this.instrument = instrument;
        this.source = source;
    }
}
