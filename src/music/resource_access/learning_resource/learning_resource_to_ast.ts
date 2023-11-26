import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { LearningResource } from './learning_resource';


export const learningResourceToAst = (learningResource: LearningResource): Root => {
    return {
        type: "root",
        children: [
            frontMatter(learningResource),
        ]
    }
}

const frontMatter = (learningResource: LearningResource): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(learningResource))
    }
}

const frontMatterData = (learningResource: LearningResource): object => {
    return {
        $schema: `learning_resource.schema.json`,
        kind: learningResource.kind,
        source: learningResource.source,
    }
}
