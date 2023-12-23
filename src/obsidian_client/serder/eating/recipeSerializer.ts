import { SerializerBuilder, link } from "src/common/mdast_serializer";
import { parseWikiLink } from "src/common/wiki_link_utils";
import { Recipe } from "src/systems/eating/resource_access/recipe";

export const recipeSerializer = new SerializerBuilder<Recipe>()
    .frontMatter({
        get: (recipe) => ({
            $schema: `recipe.schema.json`,
            kind: recipe.kind,
            source: recipe.source,
            ingredients: recipe.ingredientUsages.map(it => link('eating/ingredient/', it.ingredient))
        }),
        set: (value) => ({
            kind: value.kind,
            source: value.source
        }),
    })
    .heading2("Recipe")
    .table(["ingredient", "amount", "unit"], {
        get: (data) => data.ingredientUsages.map(iu => Object.assign({}, iu, {ingredient: link('eating/ingredient/', iu.ingredient)})),
        set: (value) => ({ingredientUsages: value.map(iu => Object.assign({}, iu, {ingredient: parseWikiLink(iu.ingredient)}))})
    })
    .heading2("Description")
    .paragraph({
        get: (data) => data.description,
        set: (value) => ({description: value})
    })
    .heading2("Log")
    .table(["date", "rating", "notes"], {
        get: (data) => data.log,
        set: (value) => ({log: value})
    });
