import { Root, TableRow } from 'mdast';
import { parseYaml } from 'obsidian';
import { AssertionError } from 'assert';
import { IngredientUsage, Recipe, RecipeLog } from './recipe';
import { Ingredient } from '../ingredient/ingredient';
import moment from 'moment';
import { parseWikiLink } from 'src/common/wiki_link_utils';

export const recipeFromAst = (name: string, ast: Root): Recipe => {
    const frontmatter = ast.children[0];
    if (frontmatter.type !== 'yaml') throw new AssertionError({message: "invalid ast", actual: frontmatter.type})
    const frontmatterData = parseYaml(frontmatter.value)

    const recipeTable = ast.children[2];
    if (recipeTable.type !== 'table') throw new AssertionError({message: "invalid ast", actual: recipeTable.type})
    const ingredientUsages = recipeTable.children.filter((_, idx) => idx != 0).map(it => ingredientUsageFromTableRow(it))

    const noteParagraphNode = ast.children[4];
    if (noteParagraphNode.type !== 'paragraph') throw new AssertionError({message: "invalid ast", actual: noteParagraphNode.type})
    const notesNode = noteParagraphNode.children[0];
    if (notesNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: notesNode.type})
    const notes = notesNode.value;

    const logTable = ast.children[6];
    if (logTable.type !== 'table') throw new AssertionError({message: "invalid ast", actual: logTable.type})
    const log = logTable.children.filter((_, idx) => idx != 0).map(it => logEntryFromTableRow(it))

    return new Recipe(
        name,
        frontmatterData["kind"],
        ingredientUsages,
        frontmatterData["source"],
        notes,
        log
    )
}

const ingredientUsageFromTableRow = (tableRow: TableRow): IngredientUsage => {
    const usageStringNode = tableRow.children[0].children[0];
    if (usageStringNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: usageStringNode.type})
    const ingredientName = parseWikiLink(usageStringNode.value);

    const linkStringNode = tableRow.children[1].children[0];
    if (linkStringNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: linkStringNode.type})
    const usageParts = linkStringNode.value.split(' ');

    return {
        amount: Number(usageParts[0]),
        unit: usageParts[1],
        ingredient: new Ingredient(ingredientName)
    }
}

const logEntryFromTableRow = (tableRow: TableRow): RecipeLog => {
    const dateNode = tableRow.children[0].children[0];
    if (dateNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: dateNode.type})
    const date = moment(dateNode.value, 'gggg-MM-DD');

    const ratingNode = tableRow.children[1].children[0];
    if (ratingNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: ratingNode.type})
    const rating = +ratingNode.value;

    const notesNode = tableRow.children[2].children[0];
    if (notesNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: notesNode.type})
    const notes = notesNode.value

    return {
        date: date,
        rating: rating,
        notes: notes,
    }
}
