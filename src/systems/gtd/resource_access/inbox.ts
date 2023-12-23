import { Note } from "src/common/note";
import { Task } from "./project";

export interface Inbox extends Note {
    readonly directory: 'gtd/inbox/';
    readonly tasks: Task[];
}
