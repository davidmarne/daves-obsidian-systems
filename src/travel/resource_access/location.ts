
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
export class Location extends Note {
    readonly coordinates: Coordinates;
    readonly kind: LocationKind;
    readonly context: Reference<Location>;

    constructor(name: string) {
        super(name, locationPath);
    }
}

export type Reference<T extends Note> = string;

export interface ItineraryEntry {
    attraction: string |  Reference<Location>,
    depart: Moment,
    arrive: Moment,
    departFrom: string |  Reference<Location> | undefined,
    budget: "TODO";
}

export class Trip extends Note {
    readonly date: Moment;
    readonly budget: "TODO";
    readonly options: (string |  Reference<Location>)[]
    readonly itinerary: ItineraryEntry[]

    constructor(name: string) {
        super(name, tripPath);
    }
}