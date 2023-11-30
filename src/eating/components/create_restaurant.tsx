import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import EatingManager from "../managers/eating_manager";
import { Restaurant } from "../resource_access/restaurant/restaurant";
import { CreateRestaurantForm } from "./internal/CreateRestaurantForm";
import { App, Modal } from 'obsidian';
import { getUrlStringFromClipboard } from 'src/common/url_util';

export class CreateRestaurantModal extends Modal {
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

export const renderForm = async (eatingManager: EatingManager, container: HTMLElement, close: () => void, initialState?: Restaurant) => {
    const cuisines = await eatingManager.readAllCuisines();
    renderMuiInShadowDom(
        container,
        <CreateRestaurantForm
            cuisines={cuisines}
            handleSubmit={async (restaurant) => {
                await eatingManager.createRestaurant(restaurant);
                close();
            }} />
    );
}
export const getRestaurantEditView = (eatingManager: EatingManager) => async (path?: string, onSubmit?: (inspiration: Restaurant) => void) => {
    const cuisines = await eatingManager.readAllCuisines();
    const defaultRestaurant = path !== undefined 
        ? await eatingManager.readRestaurant(path) 
        : null;

    const defaultSource = await getUrlStringFromClipboard();
    return <CreateRestaurantForm
            cuisines={cuisines}
            handleSubmit={async (restaurant) => {
                await eatingManager.createRestaurant(restaurant);
                close();
            }} />;
}