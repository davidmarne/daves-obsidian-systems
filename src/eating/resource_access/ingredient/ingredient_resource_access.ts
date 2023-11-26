import { Ingredient } from "src/eating/resource_access/ingredient/ingredient";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { ingredientFromAst } from "./ingredient_from_ast";
import { ingredientToAst } from "./ingredient_to_ast";

export const ingredientsPath = 'eating/ingredient/';

export default class IngredientResourceAccess extends ResourceAccess<Ingredient> {
    constructor(app: App) {
        super(app, ingredientsPath);
    }
    
    protected override fromAst(name: string, ast: Root): Ingredient {
        return ingredientFromAst(name, ast);
    }

    protected override toAst(resource: Ingredient): Root {
        return ingredientToAst(resource);
    }
}