import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Project } from './project';


export const projectToAst = (project: Project): Root => {
    return {
        type: "root",
        children: [
            frontMatter(project),
        ]
    }
}

const frontMatter = (project: Project): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(project))
    }
}

const frontMatterData = (project: Project): object => {
    return {
        $schema: `project.schema.json`,
    }
}
