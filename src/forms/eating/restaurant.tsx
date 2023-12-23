import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import { Restaurant, RestaurantDistances, RestaurantLog, RestaurantPrices } from "src/systems/eating/resource_access/restaurant";
import * as React from 'react';
import EatingManager from "src/systems/eating/managers/eating_manager";

const defaultRestaurant = (): Restaurant => ({
    directory: 'eating/restaurant/',
    name: '',
    distance: '🚗',
    price: '$',
    cuisines: [],
    description: '',
    log: []
});

const defaultLog = (): RestaurantLog => ({
    date: moment(),
    dish: '',
    rating: 0,
    notes: '',
})

export const getRestaurantEditView = (eatingManager: EatingManager) => async (path?: string, onSubmit?: (inspiration: Restaurant) => void) => {
    const cuisines = await eatingManager.listCuisines();
    const restaurant = path !== undefined
        ? await eatingManager.readRestaurant(path)
        : undefined;

    return <GenericForm
        defaultState={restaurant || defaultRestaurant()}
        config={{
            directory: null,
            name: stringFormElement,
            distance: selectFormElement(RestaurantDistances),
            price: selectFormElement(RestaurantPrices),
            cuisines: multiSelectOrCreate(cuisines.map(it => it.name)),
            description: multilineStringFormElement,
            log: tableFormElement(
                defaultLog,
                {
                    date: dateColumn(),
                    dish: textColumn(),
                    rating: numberColumn(),
                    notes: textColumn(),
                }
            ),
        }}
        onChange={async (restaurant: Restaurant) => {
            await eatingManager.writeRestaurant(restaurant);
            onSubmit && onSubmit(restaurant);
        }} />;
}