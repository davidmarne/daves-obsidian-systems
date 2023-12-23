import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import EatingManager from "src/systems/eating/managers/eating_manager";
import { Cuisine } from "src/systems/eating/resource_access/cuisine";
import { NoteFormComponentFactory } from "../note_forms";

const defaultCuisine = (): Cuisine => ({
    directory: 'eating/cuisine/',
    name: '',
});

export const getCuisineEditView = (eatingManager: EatingManager) => async (path?: string, onSubmit?: (inspiration: Cuisine) => void) => {
    const cuisine = path !== undefined
        ? await eatingManager.readCuisine(path)
        : undefined;

    return <GenericForm
        defaultState={cuisine || defaultCuisine()}
        config={{
            directory: null,
            name: stringFormElement,
        }}
        onChange={async (cuisine: Cuisine) => {
            await eatingManager.writeCuisine(cuisine);
            onSubmit && onSubmit(cuisine);
        }} />;
}