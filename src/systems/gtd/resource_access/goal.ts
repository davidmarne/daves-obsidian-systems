import { Note } from "src/common/note";
import { Reference } from "src/systems/travel/resource_access/location";
import { Value } from "src/systems/gtd/resource_access/value";

export const defaultGoal = () => ({
    directory: 'gtd/goal/',
    why: '',
    description: '',
    values: [],
});

export interface Goal extends Note {
    readonly directory: 'gtd/goal/';
    readonly description: string;
    readonly why: string;
    readonly values: Reference<Value>[];
}
