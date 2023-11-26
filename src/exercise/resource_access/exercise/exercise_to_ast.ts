import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Exercise } from './exercise';


export const exerciseToAst = (exercise: Exercise): Root => {
    return {
        type: "root",
        children: [
            frontMatter(exercise),
        ]
    }
}

const frontMatter = (exercise: Exercise): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(exercise))
    }
}

const frontMatterData = (exercise: Exercise): object => {
    return {
        $schema: `exercise.schema.json`,
    }
}
