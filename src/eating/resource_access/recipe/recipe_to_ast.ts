import { Heading, Paragraph, Root, Table, TableRow, Text, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Recipe, IngredientUsage, RecipeLog } from './recipe';


export const recipeToAst = (recipe: Recipe): Root => {
    return {
        type: "root",
        children: [
            frontMatter(recipe),
            recipeHeading(),
            recipeTable(recipe),
            descriptionHeading(),
            descriptionContent(recipe),
            logHeading(),
            logTable(recipe),
        ]
    }
}

const frontMatter = (recipe: Recipe): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(recipe))
    }
}

const frontMatterData = (recipe: Recipe): object => {
    return {
        $schema: `recipe.schema.json`,
        kind: recipe.kind,
        source: recipe.source,
        ingredients: recipe.ingredientUsages.map(it => it.ingredient.link())
    }
}

const recipeHeading = (): Heading => {
    return {
        type: "heading",
        depth: 2,
        children: [{
            type: "text",
            value: "Recipe"
        }]
    }
}

const recipeTable = (recipe: Recipe): Table => {
    return {
        type: "table",
        children: [
            recipeTableHeaderRow(), 
            ...recipe.ingredientUsages.map(it => recipeTableRow(it))
        ]
    }
}

const recipeTableHeaderRow = (): TableRow => {
    return {
        type: "tableRow",
        children: [{
            type: "tableCell",
            children: [{
                type: "text",
                value: 'ingredient'
            }]
        }, {
            type: "tableCell",
            children: [{
                type: "text",
                value: `amount`
            }]
        }]
    }
}

const recipeTableRow = (ingredientUsage: IngredientUsage): TableRow => {
    return {
        type: "tableRow",
        children: [{
            type: "tableCell",
            children: [{
                type: "text",
                value: ingredientUsage.ingredient.tableLink()
            }]
        },{
            type: "tableCell",
            children: [{
                type: "text",
                value: `${ingredientUsage.amount} ${ingredientUsage.unit}`
            }]
        }]
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


const descriptionContent = (recipe: Recipe): Paragraph => {
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

const logTable = (recipe: Recipe): Table => {
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

const logTableRow = (log: RecipeLog): TableRow => {
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
