
import { App } from 'obsidian';
import { Moment } from 'moment';
import { Note } from 'src/common/note';

export const locationPath = 'travel/location';
export const tripPath = 'travel/trip';

const LocationKinds = ["country", "state", "city", "neighborhood", "attraction"] as const;
type LocationKind = typeof LocationKinds[number];

export interface Coordinates {
    lat: number,
    lon: number
}

// TODO: have restaurant extend Location
// or just move restaurant to travel?
// or just make restaurant a "location"
export interface Location extends Note {
    readonly directory: 'travel/location/'
    readonly coordinates: Coordinates;
    readonly kind: LocationKind;
    readonly context: Reference<Location>;
}

export type Reference<T extends Note> = string;
