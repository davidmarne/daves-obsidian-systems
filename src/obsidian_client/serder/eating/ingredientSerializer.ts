import { SerializerBuilder } from "src/common/mdast_serializer";
import { Ingredient } from "src/systems/eating/resource_access/ingredient";

export const ingredientSerializer = new SerializerBuilder<Ingredient>()
    .frontMatter({
        get: (_) => ({$schema: `ingredient.schema.json`}),
        set: (_) => {
            return {}
        },
    });;
