import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Cuisine } from './cuisine';


export const cuisineToAst = (cuisine: Cuisine): Root => {
    return {
        type: "root",
        children: [
            frontMatter(cuisine),
        ]
    }
}

const frontMatter = (cuisine: Cuisine): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(cuisine))
    }
}

const frontMatterData = (cuisine: Cuisine): object => {
    return {
        $schema: `cuisine.schema.json`,
    }
}
