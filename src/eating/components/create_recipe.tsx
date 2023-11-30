import { App } from 'obsidian';
import * as React from 'react';
import EatingManager from "../managers/eating_manager";
import { CreateRecipeForm } from "./internal/CreateRecipeForm";
import { Recipe } from '../resource_access/recipe/recipe';

export const getRecipeEditView = (app: App, eatingManager: EatingManager) => async (path?: string, onSubmit?: (recipe: Recipe) => void) => {
    const ingredients = await eatingManager.readAllIngredients();
    const defaultRecipe = path
        ? await eatingManager.readRecipe(path) 
        : undefined;

    return <CreateRecipeForm
        defaultRecipe={defaultRecipe}
        ingredients={ingredients.map(it => it.name)}
        handleSubmit={async (recipe) => {
            const tfile = await eatingManager.createRecipe(recipe);
            app.workspace.getLeaf(false).openFile(tfile);
            onSubmit && onSubmit(recipe);
        }} />;
}