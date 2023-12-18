import { AssertionError } from 'assert';
import { Root, TableRow } from 'mdast';
import moment from 'moment';
import { parseYaml } from 'obsidian';
import { Restaurant, RestaurantLog } from './restaurant';
import { parseWikiLink } from 'src/common/wiki_link_utils';
import { Cuisine } from '../cuisine/cuisine';


export const restaurantFromAst = (name: string, ast: Root): Restaurant => {
    const frontmatter = ast.children[0];
    if (frontmatter.type !== 'yaml') throw new AssertionError({message: "invalid ast", actual: frontmatter.type})
    const frontmatterData = parseYaml(frontmatter.value)

    const descriptionParagraphNode = ast.children[2];
    if (descriptionParagraphNode.type !== 'paragraph') throw new AssertionError({message: "invalid ast", actual: descriptionParagraphNode.type})
    const descriptionNode = descriptionParagraphNode.children[0];
    if (descriptionNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: descriptionNode.type})
    const description = descriptionNode.value;

    const logTable = ast.children[4];
    if (logTable.type !== 'table') throw new AssertionError({message: "invalid ast", actual: logTable.type})
    const log = logTable.children.filter((_, idx) => idx != 0).map(it => logEntryFromTableRow(it))

    return new Restaurant(
        name,
        frontmatterData['distance'],
        frontmatterData['price'],
        frontmatterData['cuisine'].map(parseWikiLink),
        description,
        log
    )
}

const logEntryFromTableRow = (tableRow: TableRow): RestaurantLog => {
    const dateNode = tableRow.children[0].children[0];
    if (dateNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: dateNode.type})
    const date = moment(dateNode.value, 'gggg-MM-DD');

    const dishNode = tableRow.children[1].children[0];
    if (dishNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: dishNode.type})
    const dish = dishNode.value;

    const ratingNode = tableRow.children[2].children[0];
    if (ratingNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: ratingNode.type})
    const rating = +ratingNode.value;

    const notesNode = tableRow.children[3].children[0];
    if (notesNode.type !== 'text') throw new AssertionError({message: "invalid ast", actual: notesNode.type})
    const notes = notesNode.value;

    return {
        date: date,
        dish: dish,
        rating: rating,
        notes: notes,
    }
}