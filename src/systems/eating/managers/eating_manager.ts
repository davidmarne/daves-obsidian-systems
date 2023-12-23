import { Recipe } from "src/systems/eating/resource_access/recipe";
import { Restaurant } from "../resource_access/restaurant";
import { Cuisine } from "../resource_access/cuisine";
import { IResourceAccess } from "src/common/resource_access";
import { Ingredient } from "../resource_access/ingredient";

export default class EatingManager {
    readonly ingredientResourceAccess: IResourceAccess<Ingredient>;
    readonly recipeResourceAccess: IResourceAccess<Recipe>;
    readonly restaurantResourceAccess: IResourceAccess<Restaurant>;
    readonly cuisineResourceAccess: IResourceAccess<Cuisine>;

    constructor(ingredientResourceAccess: IResourceAccess<Ingredient>,
        recipeResourceAccess: IResourceAccess<Recipe>,
        restaurantResourceAccess: IResourceAccess<Restaurant>,
        cuisineResourceAccess: IResourceAccess<Cuisine>) {

        this.ingredientResourceAccess = ingredientResourceAccess;
        this.recipeResourceAccess = recipeResourceAccess;
        this.restaurantResourceAccess = restaurantResourceAccess;
        this.cuisineResourceAccess = cuisineResourceAccess;
    }


    async writeRecipe(newRecipe: Recipe): Promise<void> {
        await this.recipeResourceAccess.write(newRecipe);
        for (const ingredientUsage of newRecipe.ingredientUsages) {
            if (!this.ingredientResourceAccess.exists(ingredientUsage.ingredient)) {
                await this.ingredientResourceAccess.write({
                    directory: 'eating/ingredient/',
                    name: ingredientUsage.ingredient
                });
            }
        }
    }

    async writeRestaurant(newRestaurant: Restaurant): Promise<void> {
        await this.restaurantResourceAccess.write(newRestaurant);
        for (const cuisine of newRestaurant.cuisines) {
            if (!this.cuisineResourceAccess.exists(cuisine)) {
                await this.cuisineResourceAccess.write({
                    directory: 'eating/cuisine/',
                    name: cuisine,
                });
            }
        }
    }

    async writeIngredient(newIngredient: Ingredient): Promise<void> {
        await this.ingredientResourceAccess.write(newIngredient);
    }

    async writeCuisine(newCuisine: Cuisine): Promise<void> {
        await this.cuisineResourceAccess.write(newCuisine);
    }
    
    async listRecipes() {
        return this.recipeResourceAccess.list();
    }

    async readRecipe(name: string) {
        return this.recipeResourceAccess.read(name);
    }

    async readRestaurant(name: string) {
        return this.restaurantResourceAccess.read(name);
    }

    async readIngredient(name: string) {
        return this.ingredientResourceAccess.read(name);
    }

    async readCuisine(name: string) {
        return this.cuisineResourceAccess.read(name);
    }


    async listIngredients() {
        return this.ingredientResourceAccess.list();
    }

    async listCuisines() {
        return this.cuisineResourceAccess.list();
    }

    async listRestaurants() {
        return this.restaurantResourceAccess.list();
    }

    async addToRecipeLog(recipe: Recipe) {
        console.log("TODO: addToRecipeLog", recipe);
    }

    async addToRestaurantLog(restaurant: Restaurant) {
        console.log("TODO: addToRestaurantLog", restaurant);
    }
}