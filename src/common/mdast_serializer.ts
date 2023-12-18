import { Heading, List, Node, Paragraph, Root, Yaml } from 'mdast';
import { parseYaml, stringifyYaml } from 'obsidian';
import { AssertionError } from 'assert';
import { withPartial } from 'src/common/react_util';
import { parseWikiLink } from 'src/common/wiki_link_utils';


interface GetterSetter<T, V> {
    get: (data: T) => V,
    set: (value: V) => Partial<T>,
}

interface Step<T extends Node, P> {
    toAst: (data: P) => T,
    fromAst: (node: T) => P
}

export class SerializerBuilder<T> {
    steps: Step<any, any>[];

    constructor() {
        this.steps = [];
    }

    serialize(data: T): Root {
        return {
            type: "root",
            children: this.steps.map(it => it.toAst(data))
        }
    }

    deserialize(ast: Root, defaultValue: T): T {
        var result = defaultValue;
        var i = 0;
        for (const step of this.steps) {
            const stepNode = ast.children[i]
            const value = step.fromAst(stepNode)
            result = withPartial(result, value)
            i++;
        }
        return result as T;
    }

    frontMatter<D>(step: GetterSetter<T, D>) {
        this.steps.push({
            toAst: (data: T): Yaml => ({
                type: "yaml",
                value: stringifyYaml(step.get(data))
            }),
            fromAst: (node: Yaml) => step.set(parseYaml(node.value))
        });
        return this;
    }

    heading2(value: string) {
        this.steps.push({
            toAst: (_: T): Heading => ({
                type: "heading",
                depth: 2,
                children: [{
                    type: "text",
                    value: value
                }]
            }),
            fromAst: (node: Heading) => {
                const textNode = node.children[0];
                if (textNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: textNode.type})
                if (textNode.value !== value) throw new AssertionError({message: "invalid ast", actual: textNode.value})
                return {};
            }
        });
        return this;
    }

    paragraph(step: GetterSetter<T, string>) {
        this.steps.push({
            toAst: (data: T): Paragraph => ({
                type: "paragraph",
                children: [{
                    type: "text",
                    value: step.get(data)
                }]
            }),
            fromAst: (node: Paragraph) => {
                const textNode = node.children[0];
                if (textNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: textNode.type})
                return step.set(textNode.value)
            }
        });
        return this;
    }

    list(step: GetterSetter<T, string[]>) {
        this.steps.push({
            toAst: (data: T): List => ({
                type: "list",
                children: step.get(data).map(it => ({
                    type: 'listItem',
                    children: [{
                        type: 'paragraph',
                        children: [{type: 'text', value: it}]
                    }]
                }))
            }),
            fromAst: (node: List) => {
                const getText = (index: number) => {
                    const listItemNode = node.children[index];
                    if (listItemNode.type !== 'listItem') throw new AssertionError({message: "invalid ast", actual: listItemNode.type})
                    const pItemNode = listItemNode.children[0];
                    if (pItemNode.type !== 'paragraph') throw new AssertionError({message: "invalid ast", actual: pItemNode.type})
                    const textItemNode = pItemNode.children[0];
                    if (textItemNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: textItemNode.type})
                    return textItemNode.value;
                }
                return step.set((node?.children || []).map((_, idx) => getText(idx)))
            }
        });
        return this;
    }
}

export const path = (directory: string, name: string) => {
    return `${directory}${name}.md`
}

export const link = (directory: string, name: string) => {
    return `[[${path(directory, name)}|${name}]]`
}

// wiki links in markdown get messed up due to the | (which is a cell separator in tables)
// obsidian works around this by escaping the |
// TODO: just use markdown style links instead of wiki links?
export const tableLink = (directory: string, name: string) => {
    return `[[${path(directory, name)}\\|${name}]]`
}