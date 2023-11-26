import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { EntertainmentContent } from './entertainment_content';


export const entertainmentContentToAst = (entertainment_content: EntertainmentContent): Root => {
    return {
        type: "root",
        children: [
            frontMatter(entertainment_content),
        ]
    }
}

const frontMatter = (entertainment_content: EntertainmentContent): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(entertainment_content))
    }
}

const frontMatterData = (entertainment_content: EntertainmentContent): object => {
    return {
        $schema: `entertainment_content.schema.json`,
        kind: entertainment_content.kind,
        state: entertainment_content.state,
    }
}
