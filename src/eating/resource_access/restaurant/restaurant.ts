

import { Moment } from 'moment';
import { Note } from '../../../common/note';
import { Cuisine } from '../cuisine/cuisine';
import { restaurantPath } from './restaurant_resource_access';

export class Restaurant extends Note {
    readonly distance: RestaurantDistance;
    readonly price: RestaurantPrice;
    readonly cuisines: Cuisine[];
    readonly description: string;
    readonly log: RestaurantLog[];

    constructor(name: string, distance: RestaurantDistance, price: RestaurantPrice, cuisines: Cuisine[], description: string, log: RestaurantLog[]) {
        super(name, restaurantPath);
        this.distance = distance;
        this.price = price;
        this.cuisines = cuisines;
        this.description = description;
        this.log = log;
    }
}

export type RestaurantDistance = '🚶🏻' | '🚌' | '🚗' | '✈️';
export const RestaurantDistances: RestaurantDistance[] = ['🚶🏻', '🚌', '🚗', '✈️'];


export type RestaurantPrice = '$' | '$$' | '$$$' | '$$$$' | '$$$$$';
export const RestaurantPrices: RestaurantPrice[] = ['$', '$$', '$$$', '$$$$', '$$$$$'];

export interface RestaurantLog {
    date: Moment,
    dish: string,
    rating: number,
    notes: string
}