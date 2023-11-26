
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { practiceExercisesPath } from './practice_exercise_resource_access';


type Instument = "guitar" | "synth" | "drums";
type Instuments = ["guitar", "synth", "drums"];

export class PracticeExercise extends Note {
    readonly instrument: Instument;
    
    constructor(name: string) {
        super(name, practiceExercisesPath);
    }
}
