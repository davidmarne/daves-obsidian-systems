import { PracticeExercise } from "src/music/resource_access/practice_exercise/practice_exercise";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { practiceExerciseFromAst } from "./practice_exercise_from_ast";
import { practiceExerciseToAst } from "./practice_exercise_to_ast";

export const practiceExercisesPath = 'eating/practice_exercise/';

export default class PracticeExerciseResourceAccess extends ResourceAccess<PracticeExercise> {
    constructor(app: App) {
        super(app, practiceExercisesPath);
    }
    
    protected override fromAst(name: string, ast: Root): PracticeExercise {
        return practiceExerciseFromAst(name, ast);
    }

    protected override toAst(resource: PracticeExercise): Root {
        return practiceExerciseToAst(resource);
    }
}