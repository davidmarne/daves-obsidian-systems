
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { Restaurant } from "./restaurant";
import { restaurantFromAst } from "./restaurant_from_ast";
import { restaurantToAst } from "./restaurant_to_ast";

export const restaurantPath = 'eating/restaurant/';

export default class RestaurantResourceAccess extends ResourceAccess<Restaurant> {
    constructor(app: App) {
        super(app, restaurantPath);
    }
    
    protected fromAst(name: string, ast: Root): Restaurant {
        return restaurantFromAst(name, ast);
    }

    protected toAst(resource: Restaurant): Root {
        return restaurantToAst(resource);
    }
}