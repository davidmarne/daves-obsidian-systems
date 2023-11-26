import { Cuisine } from "src/eating/resource_access/cuisine/cuisine";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { cuisineFromAst } from "./cuisine_from_ast";
import { cuisineToAst } from "./cuisine_to_ast";

export const cuisinesPath = 'eating/cuisine/';

export default class CuisineResourceAccess extends ResourceAccess<Cuisine> {
    constructor(app: App) {
        super(app, cuisinesPath);
    }
    
    protected override fromAst(name: string, ast: Root): Cuisine {
        return cuisineFromAst(name, ast);
    }

    protected override toAst(resource: Cuisine): Root {
        return cuisineToAst(resource);
    }
}