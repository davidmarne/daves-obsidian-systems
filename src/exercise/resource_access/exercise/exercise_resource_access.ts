import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { exerciseFromAst } from "./exercise_from_ast";
import { exerciseToAst } from "./exercise_to_ast";
import { Exercise } from "./exercise";

export const exercisesPath = 'eating/exercise/';

export default class ExerciseResourceAccess extends ResourceAccess<Exercise> {
    constructor(app: App) {
        super(app, exercisesPath);
    }
    
    protected override fromAst(name: string, ast: Root): Exercise {
        return exerciseFromAst(name, ast);
    }

    protected override toAst(resource: Exercise): Root {
        return exerciseToAst(resource);
    }
}