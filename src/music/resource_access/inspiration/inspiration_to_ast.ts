import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Inspiration } from './inspiration';


export const inspirationToAst = (inspiration: Inspiration): Root => {
    return {
        type: "root",
        children: [
            frontMatter(inspiration),
        ]
    }
}

const frontMatter = (inspiration: Inspiration): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(inspiration))
    }
}

const frontMatterData = (inspiration: Inspiration): object => {
    return {
        $schema: `inspiration.schema.json`,
    }
}
