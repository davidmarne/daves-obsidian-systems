import { Root, RootContent, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Inspiration } from './inspiration';
import { getMDASTForString } from 'src/common/ast';


export const inspirationToAst = (inspiration: Inspiration): Root => {
    return {
        type: "root",
        children: [
            frontMatter(inspiration),
            ...markdownChildren(inspiration)
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
        kind: inspiration.kind,
        source: inspiration.source,
        projects: inspiration.projects.map(it => it.link())
    }
}

const markdownChildren = (inspiration: Inspiration): RootContent[] => {
    const ast = getMDASTForString(inspiration.description);
    return ast.children;
}