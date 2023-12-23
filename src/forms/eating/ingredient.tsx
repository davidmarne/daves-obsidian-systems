import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import EatingManager from "src/systems/eating/managers/eating_manager";
import { Ingredient } from "src/systems/eating/resource_access/ingredient";

const defaultIngredient = ():Ingredient => ({
    directory: 'eating/ingredient/',
    name: '',
});

export const getIngredientEditView = (eatingManager: EatingManager) => async (path?: string, onSubmit?: (inspiration: Ingredient) => void) => {
    const ingredient = path !== undefined
        ? await eatingManager.readIngredient(path)
        : undefined;

    return <GenericForm
        defaultState={ingredient || defaultIngredient()}
        config={{
            directory: null,
            name: stringFormElement,
        }}
        onChange={async (ingredient: Ingredient) => {
            await eatingManager.writeIngredient(ingredient);
            onSubmit && onSubmit(ingredient);
        }} />;
}