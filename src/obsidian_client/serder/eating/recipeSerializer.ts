import { SerializerBuilder, link } from "src/common/mdast_serializer";
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
        get: (data) => data.ingredientUsages,
        set: (value) => ({ingredientUsages: value})
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
