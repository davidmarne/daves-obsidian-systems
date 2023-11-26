import InspirationResourceAccess from "../resource_access/inspiration/inspiration_resource_access";
import LearningResourceResourceAccess from "../resource_access/learning_resource/learning_resource_resource_access";
import LyricResourceAccess from "../resource_access/lyric/lyric_resource_access";
import PracticeExerciseResourceAccess from "../resource_access/practice_exercise/practice_exercise_resource_access";
import ProjectResourceAccess from "../resource_access/project/project_resource_access";


export default class MusicManager {
    private readonly inspirationResourceAccess: InspirationResourceAccess;
    private readonly learningResourceResourceAccess: LearningResourceResourceAccess;
    private readonly lyricResourceAccess: LyricResourceAccess;
    private readonly practiceExerciseResourceAccess: PracticeExerciseResourceAccess;
    private readonly projectResourceAccess: ProjectResourceAccess;

    constructor(inspirationResourceAccess: InspirationResourceAccess,
        learningResourceResourceAccess: LearningResourceResourceAccess,
        lyricResourceAccess: LyricResourceAccess,
        practiceExerciseResourceAccess: PracticeExerciseResourceAccess,
        projectResourceAccess: ProjectResourceAccess) {

        this.inspirationResourceAccess = inspirationResourceAccess;
        this.learningResourceResourceAccess = learningResourceResourceAccess;
        this.lyricResourceAccess = lyricResourceAccess;
        this.practiceExerciseResourceAccess = practiceExerciseResourceAccess;
        this.projectResourceAccess = projectResourceAccess;
    }

    async readAllInspirations() {
        return await this.inspirationResourceAccess.readAll();
    }

    async readAllLearningResources() {
        return await this.learningResourceResourceAccess.readAll();
    }

    async readAllPracticeExercises() {
        return await this.practiceExerciseResourceAccess.readAll();
    }

}