import { Inspiration } from "../resource_access/inspiration";
import { PracticeExercise } from "../resource_access/practice_exercise";
import { LearningResource } from "../resource_access/learning_resource";
import { IResourceAccess } from "src/common/resource_access";
import { MusicProject } from "../resource_access/project";
import { Lyric } from "../resource_access/lyric";


export default class MusicManager {
    private readonly inspirationResourceAccess: IResourceAccess<Inspiration>;
    private readonly learningResourceResourceAccess: IResourceAccess<LearningResource>;
    private readonly lyricResourceAccess: IResourceAccess<Lyric>;
    private readonly practiceExerciseResourceAccess: IResourceAccess<PracticeExercise>;
    private readonly projectResourceAccess: IResourceAccess<MusicProject>;

    constructor(inspirationResourceAccess: IResourceAccess<Inspiration>,
        learningResourceResourceAccess: IResourceAccess<LearningResource>,
        lyricResourceAccess: IResourceAccess<Lyric>,
        practiceExerciseResourceAccess: IResourceAccess<PracticeExercise>,
        projectResourceAccess: IResourceAccess<MusicProject>) {

        this.inspirationResourceAccess = inspirationResourceAccess;
        this.learningResourceResourceAccess = learningResourceResourceAccess;
        this.lyricResourceAccess = lyricResourceAccess;
        this.practiceExerciseResourceAccess = practiceExerciseResourceAccess;
        this.projectResourceAccess = projectResourceAccess;
    }

    async writeInspiration(newInspiration: Inspiration): Promise<void> {
        await this.inspirationResourceAccess.write(newInspiration);
    }

    async writePracticeExercise(newPracticeExercise: PracticeExercise): Promise<void> {
        await this.practiceExerciseResourceAccess.write(newPracticeExercise);
    }

    async writeLearningResource(newLearningResource: LearningResource): Promise<void> {
        await this.learningResourceResourceAccess.write(newLearningResource);
    }

    async readInspiration(name: string) {
        return this.inspirationResourceAccess.read(name);
    }

    async readLearningResource(name: string) {
        return this.learningResourceResourceAccess.read(name);
    }

    async readPracticeExercise(name: string) {
        return this.practiceExerciseResourceAccess.read(name);
    }

    async listInspirations() {
        return await this.inspirationResourceAccess.list();
    }

    async listLearningResources() {
        return await this.learningResourceResourceAccess.list();
    }

    async listPracticeExercises() {
        return await this.practiceExerciseResourceAccess.list();
    }

    async listProjects() {
        return await this.projectResourceAccess.list();
    }
}