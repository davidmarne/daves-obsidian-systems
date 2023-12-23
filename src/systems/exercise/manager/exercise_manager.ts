import { IResourceAccess } from "src/common/resource_access";
import { Exercise } from "../resource_access/exercise";

export default class ExerciseManager {
    readonly exerciseResourceAccess: IResourceAccess<Exercise>;

    constructor(exerciseResourceAccess: IResourceAccess<Exercise>) {
        this.exerciseResourceAccess = exerciseResourceAccess;
    }

    async readExercise(name: string): Promise<Exercise> {
        return await this.exerciseResourceAccess.read(name);
    }

    async writeExercise(newExercise: Exercise): Promise<void> {
        await this.exerciseResourceAccess.write(newExercise);
    }

    async listExercise() {
        return await this.exerciseResourceAccess.list();
    }
}