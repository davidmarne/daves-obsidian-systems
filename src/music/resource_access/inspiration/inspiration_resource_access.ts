import { Inspiration } from "src/music/resource_access/inspiration/inspiration";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { inspirationFromAst } from "./inspiration_from_ast";
import { inspirationToAst } from "./inspiration_to_ast";

export const inspirationsPath = 'music/inspiration/';

export default class InspirationResourceAccess extends ResourceAccess<Inspiration> {
    constructor(app: App) {
        super(app, inspirationsPath);
    }
    
    protected override fromAst(name: string, ast: Root): Inspiration {
        return inspirationFromAst(name, ast);
    }

    protected override toAst(resource: Inspiration): Root {
        return inspirationToAst(resource);
    }
}