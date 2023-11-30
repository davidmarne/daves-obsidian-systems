import { App, Modal } from 'obsidian';
import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import EatingManager from "../managers/eating_manager";
import { CreateRecipeForm } from "./internal/CreateRecipeForm";
import { Recipe } from '../resource_access/recipe/recipe';

export class CreateRecipeModal extends Modal {
    manager: EatingManager;

    constructor(app: App, manager: EatingManager) {
        super(app);
        this.manager = manager;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        renderForm(this.app, this.manager, contentEl, () => this.close())
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

const renderForm = async (app: App, eatingManager: EatingManager, container: HTMLElement, close: () => void) => {
    const ingredients = await eatingManager.readAllIngredients();
    renderMuiInShadowDom(
        container,
        <CreateRecipeForm
            ingredients={ingredients.map(it => it.name)}
            handleSubmit={async (recipe) => {
                const tfile = await eatingManager.createRecipe(recipe);
                app.workspace.getLeaf(false).openFile(tfile);
                close();
            }} />
    );
}

export const getRecipeEditView = (eatingManager: EatingManager) => async (path?: string, onSubmit?: (recipe: Recipe) => void) => {
    const ingredients = await eatingManager.readAllIngredients();
    const defaultRecipe = path
        ? await eatingManager.readRecipe(path) 
        : undefined;

    return <CreateRecipeForm
        ingredients={ingredients.map(it => it.name)}
        handleSubmit={async (recipe) => {
            const tfile = await eatingManager.createRecipe(recipe);
            app.workspace.getLeaf(false).openFile(tfile);
            close();
        }} />;
}