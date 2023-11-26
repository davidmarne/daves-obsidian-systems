import { Root } from 'mdast';
import { Cuisine } from 'src/eating/resource_access/cuisine/cuisine';


export const cuisineFromAst = (name: string, ast: Root): Cuisine => {
    return new Cuisine(name)
}
