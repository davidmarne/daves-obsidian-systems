import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import { Exercise, ExerciseKind, ExerciseKinds, defaultExercise } from "src/systems/exercise/resource_access/exercise";
import ExerciseManager from "src/systems/exercise/manager/exercise_manager";


export const getExerciseEditView = (exerciseManager: ExerciseManager) => async (path?: string, onSubmit?: (inspiration: Exercise) => void) => {
    const exercise = path !== undefined
        ? await exerciseManager.readExercise(path)
        : undefined;

    return <GenericForm
        defaultState={exercise || defaultExercise()}
        config={{
            directory: null,
            name: stringFormElement,
            kind: null,
            // TODO: kind
            // kind: selectFormElement<ExerciseKind>(ExerciseKinds),
        }}
        onChange={async (exercise: Exercise) => {
            await exerciseManager.writeExercise(exercise);
            onSubmit && onSubmit(exercise);
        }} />;
}