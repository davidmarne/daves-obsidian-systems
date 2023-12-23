

import { Moment } from 'moment';
import { Note } from '../../../common/note';
import { Cuisine } from './cuisine';
import { Reference } from 'src/systems/travel/resource_access/location';

export interface Restaurant extends Note {
    readonly directory: 'eating/restaurant/'
    readonly distance: RestaurantDistance;
    readonly price: RestaurantPrice;
    readonly cuisines: Reference<Cuisine>[];
    readonly description: string;
    readonly log: RestaurantLog[];
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