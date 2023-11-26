import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Ingredient } from './ingredient';


export const ingredientToAst = (ingredient: Ingredient): Root => {
    return {
        type: "root",
        children: [
            frontMatter(ingredient),
        ]
    }
}

const frontMatter = (ingredient: Ingredient): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(ingredient))
    }
}

const frontMatterData = (ingredient: Ingredient): object => {
    return {
        $schema: `ingredient.schema.json`,
    }
}
