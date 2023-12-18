import { Heading, Paragraph, Root, Table, TableRow, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Restaurant, RestaurantLog } from './restaurant';
import { Cuisine } from '../cuisine/cuisine';


export const restaurantToAst = (restaurant: Restaurant): Root => {
    return {
        type: "root",
        children: [
            frontMatter(restaurant),
            descriptionHeading(),
            descriptionContent(restaurant),
            logHeading(),
            logTable(restaurant),
        ]
    }
}

const frontMatter = (restaurant: Restaurant): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(restaurant))
    }
}

const frontMatterData = (restaurant: Restaurant): object => {
    return {
        $schema: `restaurant.schema.json`,
        distance: restaurant.distance,
        price: restaurant.price,
        cuisine: restaurant.cuisines.map(it => new Cuisine(it).link()),
    }
}

const descriptionHeading = (): Heading => {
    return {
        type: "heading",
        depth: 2,
        children: [{
            type: "text",
            value: "Description"
        }]
    }
}

const descriptionContent = (recipe: Restaurant): Paragraph => {
    return {
        type: "paragraph",
        children: [{
            type: "text",
            value: recipe.description
        }]
    }
}

const logHeading = (): Heading => {
    return {
        type: "heading",
        depth: 2,
        children: [{
            type: "text",
            value: "Log"
        }]
    }
}

const logTable = (recipe: Restaurant): Table => {
    return {
        type: "table",
        children: [
            logTableHeaderRow(), 
            ...recipe.log.map(it => logTableRow(it))
        ]
    }
}

const logTableHeaderRow = (): TableRow => {
    return {
        type: "tableRow",
        children: [{
            type: "tableCell",
            children: [{
                type: "text",
                value: 'date'
            }]
        }, {
            type: "tableCell",
            children: [{
                type: "text",
                value: `dish`
            }]
        },{
            type: "tableCell",
            children: [{
                type: "text",
                value: `rating`
            }]
        }, {
            type: "tableCell",
            children: [{
                type: "text",
                value: `notes`
            }]
        }]
    }
}

const logTableRow = (log: RestaurantLog): TableRow => {
    return {
        type: "tableRow",
        children: [{
            type: "tableCell",
            children: [{
                type: "text",
                value: log.date.format('gggg-MM-DD')
            }]
        },{
            type: "tableCell",
            children: [{
                type: "text",
                value: log.dish
            }]
        },{
            type: "tableCell",
            children: [{
                type: "text",
                value: log.rating.toString(),
            }]
        },{
            type: "tableCell",
            children: [{
                type: "text",
                value: log.notes
            }]
        }]
    }
}