import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { Recipe } from "./recipe";
import { recipeFromAst } from "./recipe_from_ast";
import { recipeToAst } from "./recipe_to_ast";

export const recipesPath = 'eating/recipe/';

export default class RecipeResourceAccess extends ResourceAccess<Recipe> {
    constructor(app: App) {
        super(app, recipesPath);
    }
    
    protected fromAst(name: string, ast: Root): Recipe {
        return recipeFromAst(name, ast);
    }

    protected toAst(resource: Recipe): Root {
        return recipeToAst(resource);
    }
}