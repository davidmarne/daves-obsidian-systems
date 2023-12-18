import { Note } from "src/common/note";
import { Reference } from "src/travel/resource_access/location";
import { Value } from "src/gtd/resource_access/value";
import ResourceAccess from "src/common/resource_access";
import { App } from "obsidian";
import { Root } from "mdast";


export const goalPath = 'gtd/goal';

export class Goal extends Note {
    readonly why: string;
    readonly values: Reference<Value>[];

    constructor(name: string, why: string, values: Reference<Value>[]) {
        super(name, goalPath);
        this.why = why;
    }
}

export class GoalResourceAccess extends ResourceAccess<Goal> {
    constructor(app: App) {
        super(app, goalPath);
    }
    
    protected override fromAst(name: string, ast: Root): Goal {
        throw new Error("todo");// cuisineFromAst(name, ast);
    }

    protected override toAst(resource: Goal): Root {
        throw new Error("todo");// cuisineToAst(resource);
    }
}
