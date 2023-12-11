
import { TFile, Vault, parseYaml } from 'obsidian';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import {unified} from 'unified';
import { Root, RootContent } from 'mdast';
import remarkStringify from 'remark-stringify'

const compiler = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm);

const stringifier = unified()
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkStringify);

export const getMarkdownContentFromAST = (ast: Root) => {
    let strContent = stringifier.stringify(ast);

    // hack to fix links in tables. remarkStringify seems to get tripped up on these wiki links
    // should find a better fix or possible switch to standard markdown link format
    strContent = strContent.replaceAll("\\[\\[", "[[");
    strContent = strContent.replaceAll("\\\\\\|", "\\|");
    
    return strContent;
}


export const getMDASTForString = (data: string): Root => {
    return compiler.parse(data);
}

export const getMDAST = async (vault: Vault, file: TFile): Promise<Root> => {
    const data = await vault.read(file);
    return compiler.parse(data);
}

export const getPropertiesFromAst = (ast: Root) => {
    const firstNode = ast.children[0];
    if (firstNode && firstNode['type'] === 'yaml' && 'value' in firstNode) {
        const yaml = parseYaml(firstNode.value)
        return yaml
    }
    
    return null;
}

export type MarkdownString = string;

export const newMarkdownString = (astNodes: RootContent[]) => {
    return getMarkdownContentFromAST({
        type: 'root',
        children: astNodes
    })
}