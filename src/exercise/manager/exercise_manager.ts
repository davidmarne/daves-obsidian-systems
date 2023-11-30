import { Exercise } from "../resource_access/exercise/exercise";
import ExerciseResourceAccess from "../resource_access/exercise/exercise_resource_access";

export default class ExerciseManager {
    readonly exerciseContentResourceAccess: ExerciseResourceAccess;

    constructor(exerciseContentResourceAccess: ExerciseResourceAccess) {
        this.exerciseContentResourceAccess = exerciseContentResourceAccess;
    }

    async createEntertainmentContent(newEntertainmentContent: Exercise): Promise<void> {
        await this.exerciseContentResourceAccess.writeResource(newEntertainmentContent);
    }

    async readAllEntertainmentContent() {
        return await this.exerciseContentResourceAccess.readAll();
    }
}