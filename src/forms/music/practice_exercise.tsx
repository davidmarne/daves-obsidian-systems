import * as React from 'react';
import { GenericForm, multiSelectOrCreate, multilineStringFormElement, selectFormElement, stringFormElement } from "src/common/generic_forms";
import MusicManager from 'src/systems/music/managers/music_manager';
import { PracticeExercise, defaultPracticeExercise } from "src/systems/music/resource_access/practice_exercise";


export const getPracticeExerciseEditView = (musicManager: MusicManager) => async (path?: string, onSubmit?: (practiceExercise: PracticeExercise) => void) => {
    const practiceExercise = path !== undefined
        ? await musicManager.readPracticeExercise(path)
        : defaultPracticeExercise();

    return <GenericForm
        defaultState={practiceExercise}
        config={{
            directory: null,
            name: stringFormElement,
            // instrument: selectFormElement(Instruments),
            instrument: null,
            description: multilineStringFormElement,
            source: multilineStringFormElement,
        }}
        onChange={async (practiceExercise: PracticeExercise) => {
            await musicManager.writePracticeExercise(practiceExercise);
            onSubmit && onSubmit(practiceExercise);
        }} />;
}