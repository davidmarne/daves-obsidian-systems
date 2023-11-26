import { renderMuiInShadowDom } from "src/common/Shadow";
import { App, Modal } from 'obsidian';
import * as React from 'react';
import { WhatToMakeForm } from "./internal/WhatToMakeForm";
import EatingManager from "../managers/eating_manager";

export class WhatToMakeModal extends Modal {
    manager: EatingManager;

    constructor(app: App, manager: EatingManager) {
        super(app);
        this.manager = manager;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        renderForm(this.manager, contentEl, () => this.close())
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

const renderForm = async (eatingManager: EatingManager, container: HTMLElement, close: () => void) => {
    const recipes = await eatingManager.readAllRecipes();
    renderMuiInShadowDom(
        container,
        <WhatToMakeForm
            defaultKinds={[]}
            recipes={recipes}
            ingredientsInStock={[]}
            handleSelectedIngredients={console.log}
            handleSubmit={(recipes) => {
                recipes.forEach(eatingManager.addToRecipeLog);
                close();
            }} />
    );
}