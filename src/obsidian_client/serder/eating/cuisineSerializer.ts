import { SerializerBuilder } from "src/common/mdast_serializer";
import { Cuisine } from "src/systems/eating/resource_access/cuisine";

export const cuisineSerializer = new SerializerBuilder<Cuisine>()
    .frontMatter({
        get: (_) => ({$schema: `cuisine.schema.json`}),
        set: (value) => ({}),
    });
