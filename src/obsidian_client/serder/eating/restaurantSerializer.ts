import { SerializerBuilder, link } from "src/common/mdast_serializer";
import { parseWikiLink } from "src/common/wiki_link_utils";
import { Recipe } from "src/systems/eating/resource_access/recipe";
import { Restaurant } from "src/systems/eating/resource_access/restaurant";

export const restaurantSerializer = new SerializerBuilder<Restaurant>()
    .frontMatter({
        get: (restaurant) => ({
            $schema: `restaurant.schema.json`,
            distance: restaurant.distance,
            price: restaurant.price,
            cuisines: restaurant.cuisines.map(it => link('eating/cuisines/', it)),
        }),
        set: (value) => ({
            distance: value.distance,
            price: value.price,
            cuisines: value.cuisines.map(parseWikiLink)
        }),
    })
    .heading2("Description")
    .paragraph({
        get: (data) => data.description,
        set: (value) => ({description: value})
    })
    .heading2("Log")
    .table(["date", "dish", "rating", "notes"], {
        get: (data) => data.log,
        set: (value) => ({log: value})
    });
