import * as React from 'react';
import EatingManager from "../managers/eating_manager";
import { Restaurant } from "../resource_access/restaurant/restaurant";
import { CreateRestaurantForm } from "./internal/CreateRestaurantForm";
import { App, Modal } from 'obsidian';

export const getRestaurantEditView = (app: App, eatingManager: EatingManager) => async (path?: string, onSubmit?: (inspiration: Restaurant) => void) => {
    const cuisines = await eatingManager.readAllCuisines();
    const defaultRestaurant = path !== undefined 
        ? await eatingManager.readRestaurant(path) 
        : undefined;

    return <CreateRestaurantForm
            defaultRestaurant={defaultRestaurant}
            cuisines={cuisines}
            handleSubmit={async (restaurant) => {
                const tfile = await eatingManager.createRestaurant(restaurant);
                app.workspace.getLeaf(false).openFile(tfile);
                onSubmit && onSubmit(restaurant);
            }} />;
}