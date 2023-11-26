import { Root } from 'mdast';
import { Ingredient } from 'src/eating/resource_access/ingredient/ingredient';


export const ingredientFromAst = (name: string, ast: Root): Ingredient => {
    return new Ingredient(name)
}
