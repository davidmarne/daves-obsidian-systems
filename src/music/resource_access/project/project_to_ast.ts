import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { MusicProject } from './project';


export const projectToAst = (project: MusicProject): Root => {
    return {
        type: "root",
        children: [
            frontMatter(project),
        ]
    }
}

const frontMatter = (project: MusicProject): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(project))
    }
}

const frontMatterData = (project: MusicProject): object => {
    return {
        $schema: `project.schema.json`,
    }
}
