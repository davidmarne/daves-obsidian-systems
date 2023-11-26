import { Root } from 'mdast';
import { PracticeExercise } from 'src/music/resource_access/practice_exercise/practice_exercise';


export const practiceExerciseFromAst = (name: string, ast: Root): PracticeExercise => {
    return new PracticeExercise(name)
}
