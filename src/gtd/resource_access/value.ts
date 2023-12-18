import { Root } from "mdast";
import { App } from "obsidian";
import { Note } from "src/common/note";
import ResourceAccess from "src/common/resource_access";

export const valuePath = 'gtd/value';

export class Value extends Note {
    readonly why: string;

    constructor(name: string, why: string) {
        super(name, valuePath);
        this.why = why;
    }
}

export class ValueResourceAccess extends ResourceAccess<Value> {
    constructor(app: App) {
        super(app, valuePath);
    }
    
    protected override fromAst(name: string, ast: Root): Value {
        throw new Error("todo");// cuisineFromAst(name, ast);
    }

    protected override toAst(resource: Value): Root {
        throw new Error("todo");// cuisineToAst(resource);
    }
}
