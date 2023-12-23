import { Note } from "src/common/note";
import { Reference } from "src/systems/travel/resource_access/location";
import { Goal } from "./goal";

export type Task = string

export const defaultProject = () => ({
    directory: 'gtd/project/',
    goals: [],
    why: '',
    description: '',
    tasks: [],
});

export interface Project extends Note {
    readonly directory: 'gtd/project/';
    readonly goals: Reference<Goal>[];
    readonly why: string;
    readonly description: string;
    readonly tasks: Task[];
}