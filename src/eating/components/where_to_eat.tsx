import { renderMuiInShadowDom } from "src/common/Shadow";
import { App, Modal } from 'obsidian';
import * as React from 'react';
import { WhereToEatForm } from "./internal/WhereToEat";
import EatingManager from "../managers/eating_manager";

export class WhereToEatModal extends Modal {
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
    const cuisines = await eatingManager.listCuisines();
    const restaurants = await eatingManager.listRestaurants();
    renderMuiInShadowDom(
        container,
        <WhereToEatForm
            restaurants={restaurants}
            cuisines={cuisines}
            handleSubmit={(restaurant) => {
                eatingManager.addToRestaurantLog(restaurant);
                close();
            }} />
    );
}