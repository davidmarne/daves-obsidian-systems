import * as React from 'react';
import { GenericForm, multiSelectOrCreate, multilineStringFormElement, selectFormElement, stringFormElement } from "src/common/generic_forms";
import MusicManager from 'src/systems/music/managers/music_manager';
import { LearningResource, defaultLearningResource } from "src/systems/music/resource_access/learning_resource";


export const getLearningResourceEditView = (musicManager: MusicManager) => async (path?: string, onSubmit?: (practiceExercise: LearningResource) => void) => {
    const practiceExercise = path !== undefined
        ? await musicManager.readLearningResource(path)
        : defaultLearningResource();

    return <GenericForm
        defaultState={practiceExercise}
        config={{
            directory: null,
            name: stringFormElement,
            // instrument: selectFormElement(Instruments),
            kind: null,
            description: multilineStringFormElement,
            source: multilineStringFormElement,
        }}
        onChange={async (practiceExercise: LearningResource) => {
            await musicManager.writeLearningResource(practiceExercise);
            onSubmit && onSubmit(practiceExercise);
        }} />;
}