
import { Note } from '../../../common/note';

export const ExerciseKinds = ["bike", "calisthenics", "yoga", "skateboard", "snowbard", "tennis", "kayak", "paddle_board"] as const;
export type ExerciseKind = typeof ExerciseKinds[number];

export const defaultExercise = (): Exercise => ({
    directory: 'exercise/exercise/',
    name: '',
    kind: ExerciseKinds[0],
});

export interface Exercise extends Note {
    readonly directory: 'exercise/exercise/';
    readonly kind: ExerciseKind;
}
