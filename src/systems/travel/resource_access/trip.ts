
import { Moment } from 'moment';
import { Note } from 'src/common/note';
import { Location, Reference } from './location';

export interface ItineraryEntry {
    attraction: string |  Reference<Location>,
    depart: Moment,
    arrive: Moment,
    departFrom: string |  Reference<Location> | undefined,
    budget: "TODO";
}

export interface Trip extends Note {
    readonly date: Moment;
    readonly budget: "TODO";
    readonly options: (string |  Reference<Location>)[]
    readonly itinerary: ItineraryEntry[]
}