import { App, Modal } from 'obsidian';
import * as React from 'react';
import { CreatePracticeExerciseForm } from "./internal/CreatePracticeExerciseForm";
import MusicManager from '../managers/music_manager';
import { getUrlStringFromClipboard } from 'src/common/url_util';
import { PracticeExercise } from '../resource_access/practice_exercise/practice_exercise';


export const getPracticeExerciseEditView = (app: App, musicManager: MusicManager) => async (path?: string, onSubmit?: (practiceExercise: PracticeExercise) => void) => {
    const defaultPracticeExercise = path !== undefined 
        ? await musicManager.readPracticeExercise(path) 
        : undefined;

    const defaultSource = await getUrlStringFromClipboard();
    return <CreatePracticeExerciseForm
        defaultPracticeExercise={defaultPracticeExercise}
        defaultSource={defaultSource}
        handleSubmit={async (practiceExercise) => {
            const tfile = await musicManager.createPracticeExercise(practiceExercise);
            app.workspace.getLeaf(false).openFile(tfile);
            onSubmit && onSubmit(practiceExercise)
        }} />;
}