import { Root, RootContent, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { EntertainmentContent } from './entertainment_content';
import { getMDASTForString } from 'src/common/ast';


export const entertainmentContentToAst = (entertainmentContent: EntertainmentContent): Root => {
    return {
        type: "root",
        children: [
            frontMatter(entertainmentContent),
            ...markdownChildren(entertainmentContent)
        ]
    }
}

const frontMatter = (entertainmentContent: EntertainmentContent): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(entertainmentContent))
    }
}

const frontMatterData = (entertainmentContent: EntertainmentContent): object => {
    return {
        $schema: `entertainment_content.schema.json`,
        kind: entertainmentContent.kind,
        state: entertainmentContent.state,
        anticipation: entertainmentContent.anticipation,
        rating: entertainmentContent.rating,
    }
}

const markdownChildren = (entertainmentContent: EntertainmentContent): RootContent[] => {
    const ast = getMDASTForString(entertainmentContent.description);
    return ast.children;
}
