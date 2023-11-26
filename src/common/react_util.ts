
export const withPartial = <T>(previousState: T, update: Partial<T>): T => {
    return Object.assign<Partial<T>, T, Partial<T>>({}, previousState, update);
}