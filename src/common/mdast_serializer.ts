import { Heading, List, Node, Paragraph, Root, Table, TableCell, TableRow, Yaml } from 'mdast';
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

    deserialize(ast: Root, defaultValue: Partial<T>): T {
        var result = defaultValue;
        var i = 0;
        for (const step of this.steps) {
            const stepNode = ast.children[i]
            const value = step.fromAst(stepNode)
            result = withPartial(result, value)
            i++;
        }
        console.log("deserialize result", result)
        return result as T;
    }

    frontMatter<D>(step: GetterSetter<T, D>) {
        this.steps.push({
            toAst: (data: T): Yaml => ({
                type: "yaml",
                value: stringifyYaml(step.get(data))
            }),
            fromAst: (node: Yaml) => {
                return step.set(parseYaml(node.value))
            }
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


    table<R extends Record<string, any>>(items: (keyof R)[], step: GetterSetter<T, R[]>) {
        this.steps.push({
            toAst: (data: T): Table => {
                return {
                    type: "table",
                    children: [
                        <TableRow>{
                            type: "tableRow",
                            children: items.map(it => ({
                                type: "tableCell",
                                children: [{
                                    type: "text",
                                    value: it
                                }]
                            }))
                        },
                        ...step.get(data).map((record): TableRow => ({
                            type: 'tableRow',
                            children: items.map<TableCell>(k => {
                                return ({
                                    type: "tableCell",
                                    children: [{
                                        type: "text",
                                        value: record[k]
                                    }]
                                })
                            })
                        }))
                    ]
                }
            },
            fromAst: (node: Table) => {
                const getText = (row: number, col: number) => {
                    const tableRowNode = node.children[row];
                    if (tableRowNode.type !== 'tableRow') throw new AssertionError({message: "invalid ast", actual: tableRowNode.type})
                    const cellNode = tableRowNode.children[col];
                    if (cellNode.type !== 'tableCell') throw new AssertionError({message: "invalid ast", actual: cellNode.type})
                    const textItemNode = cellNode.children[0];
                    if (textItemNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: textItemNode.type})
                    return textItemNode.value as any; // TODO: hack 
                }
                
                const rows = node?.children || [];

                const dataRows = rows.filter((_, idx) => idx !== 0);
                return step.set(dataRows.
                    map((_, row) => {
                        const rowData: Partial<R> = {};
                        
                        var i = 0;
                        for (const item of items) {
                            rowData[item] = getText(row+1, i)
                            i++;
                        }
                        return rowData as R;
                    }))
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