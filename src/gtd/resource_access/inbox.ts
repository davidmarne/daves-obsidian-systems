import { Note } from "src/common/note";
import { Task } from "./project";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";

export const inboxPath = 'gtd/inbox';

class Inbox extends Note {
    readonly tasks: Task[];

    constructor(tasks: Task[]) {
        super('inbox', inboxPath);
        this.tasks = tasks;
    }
}


export class InboxResourceAccess extends ResourceAccess<Inbox> {
    constructor(app: App) {
        super(app, inboxPath);
    }
    
    protected override fromAst(name: string, ast: Root): Inbox {
        throw new Error("todo");// cuisineFromAst(name, ast);
    }

    protected override toAst(resource: Inbox): Root {
        throw new Error("todo");// cuisineToAst(resource);
    }
}
