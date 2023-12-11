import { useState } from "react";

export type PartialUpdater<T> = (partial: Partial<T>) => void;

export const useStateWithPartialUpdater = <T>(defaultState: T): [T, PartialUpdater<T>] => {
    const [state, dispatcher] = useState(defaultState);
    const updater = (update: Partial<T>) => dispatcher(withPartial(state, update));
    return [state, updater];
}

export const withPartial = <T>(previousState: T, update: Partial<T>): T => {
    return Object.assign<Partial<T>, T, Partial<T>>(Object.create(Object.getPrototypeOf(previousState)), previousState, update);
}