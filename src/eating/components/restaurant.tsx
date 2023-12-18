import * as React from 'react';
import EatingManager from "../managers/eating_manager";
import { Restaurant } from "../resource_access/restaurant/restaurant";
import { CreateRestaurantForm, EditRestaurant } from "./internal/restaurant/CreateRestaurantForm";
import { App, Modal } from 'obsidian';

export const getRestaurantEditView = (app: App, eatingManager: EatingManager) => async (path?: string, onSubmit?: (inspiration: Restaurant) => void) => {
    const cuisines = await eatingManager.listCuisines();
    const defaultRestaurant = path !== undefined 
        ? await eatingManager.readRestaurant(path) 
        : undefined;

    return <EditRestaurant
            restaurant={defaultRestaurant}
            cuisines={cuisines}
            handleSubmit={async (restaurant) => {
                const tfile = await eatingManager.createRestaurant(restaurant);
                app.workspace.getLeaf(false).openFile(tfile);
                onSubmit && onSubmit(restaurant);
            }} />;
}