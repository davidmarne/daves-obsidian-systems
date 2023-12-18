import { TFile } from "obsidian";
import { Inspiration } from "../resource_access/inspiration/inspiration";
import InspirationResourceAccess from "../resource_access/inspiration/inspiration_resource_access";
import LearningResourceResourceAccess from "../resource_access/learning_resource/learning_resource_resource_access";
import LyricResourceAccess from "../resource_access/lyric/lyric_resource_access";
import PracticeExerciseResourceAccess from "../resource_access/practice_exercise/practice_exercise_resource_access";
import MusicProjectResourceAccess from "../resource_access/project/project_resource_access";
import { PracticeExercise } from "../resource_access/practice_exercise/practice_exercise";
import { LearningResource } from "../resource_access/learning_resource/learning_resource";


export default class MusicManager {
    private readonly inspirationResourceAccess: InspirationResourceAccess;
    private readonly learningResourceResourceAccess: LearningResourceResourceAccess;
    private readonly lyricResourceAccess: LyricResourceAccess;
    private readonly practiceExerciseResourceAccess: PracticeExerciseResourceAccess;
    private readonly projectResourceAccess: MusicProjectResourceAccess;

    constructor(inspirationResourceAccess: InspirationResourceAccess,
        learningResourceResourceAccess: LearningResourceResourceAccess,
        lyricResourceAccess: LyricResourceAccess,
        practiceExerciseResourceAccess: PracticeExerciseResourceAccess,
        projectResourceAccess: MusicProjectResourceAccess) {

        this.inspirationResourceAccess = inspirationResourceAccess;
        this.learningResourceResourceAccess = learningResourceResourceAccess;
        this.lyricResourceAccess = lyricResourceAccess;
        this.practiceExerciseResourceAccess = practiceExerciseResourceAccess;
        this.projectResourceAccess = projectResourceAccess;
    }

    async createInspiration(newInspiration: Inspiration): Promise<TFile> {
        return this.inspirationResourceAccess.writeResource(newInspiration);
    }

    async createPracticeExercise(newPracticeExercise: PracticeExercise): Promise<TFile> {
        return this.practiceExerciseResourceAccess.writeResource(newPracticeExercise);
    }

    async createLearningResource(newLearningResource: LearningResource): Promise<TFile> {
        return this.learningResourceResourceAccess.writeResource(newLearningResource);
    }

    async readInspiration(path: string) {
        return this.inspirationResourceAccess.readResourceByPath(path);
    }

    async readLearningResource(path: string) {
        return this.learningResourceResourceAccess.readResourceByPath(path);
    }

    async readPracticeExercise(path: string) {
        return this.practiceExerciseResourceAccess.readResourceByPath(path);
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