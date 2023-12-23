import { Note } from "src/common/note";

export const defaultValue = () => ({
    directory: 'gtd/value/',
    why: '',
    description: '',
});

export interface Value extends Note {
    readonly directory: 'gtd/value/'
    readonly description: string;
    readonly why: string;
}
