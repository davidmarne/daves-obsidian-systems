
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { exercisesPath } from './exercise_resource_access';

type ExerciseKind = "bike" | "calisthenics" | "yoga" | "skateboard" | "snowbard" | "tennis" | "kayak" | "paddle_board";
type ExerciseKinds = ["bike", "calisthenics", "yoga", "skateboard", "snowbard", "tennis", "kayak", "paddle_board"];

export class Exercise extends Note {
    readonly kind: ExerciseKind;

    constructor(name: string) {
        super(name, exercisesPath);
    }
}
