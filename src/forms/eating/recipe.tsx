import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, selectOrCreatNote, selectOrCreatNoteColumn, selectOrCreate, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import EatingManager from "src/systems/eating/managers/eating_manager";
import { IngredientUsage, Recipe, RecipeKinds, RecipeLog } from "src/systems/eating/resource_access/recipe";

const defaultRecipe = (): Recipe => ({
    directory: 'eating/recipe/',
    name: '',
    description: '',
    kind: RecipeKinds[0],
    source: '',
    ingredientUsages: [],
    log: [],
});

const defaultIngredientUsage = (): IngredientUsage => ({
    ingredient: '',
    amount: 0,
    unit: '',
})

const defaultLog = (): RecipeLog => ({
    date: moment(),
    rating: 0,
    notes: '',
})

export const getRecipeEditView = (eatingManager: EatingManager) => async (path?: string, onSubmit?: (inspiration: Recipe) => void) => {
    const recipe = path !== undefined
        ? await eatingManager.readRecipe(path)
        : undefined;

    const ingredients = await eatingManager.listIngredients();

    return <GenericForm
        defaultState={recipe || defaultRecipe()}
        config={{
            directory: null,
            name: stringFormElement,
            description: multilineStringFormElement,
            kind: selectFormElement(RecipeKinds),
            source: stringFormElement,
            ingredientUsages: tableFormElement(
                defaultIngredientUsage,
                {
                    ingredient: selectOrCreatNoteColumn(ingredients),
                    amount: numberColumn(),
                    unit: textColumn(),
                }
            ),
            log: tableFormElement(
                defaultLog,
                {
                    date: dateColumn(),
                    rating: numberColumn(),
                    notes: textColumn(),
                }
            ),
        }}
        onChange={async (recipe: Recipe) => {
            await eatingManager.writeRecipe(recipe);
            onSubmit && onSubmit(recipe);
        }} />;
}