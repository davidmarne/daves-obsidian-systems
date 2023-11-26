import IngredientResourceAccess from "src/eating/resource_access/ingredient/ingredient_resource_access";
import RecipeResourceAccess from "src/eating/resource_access/recipe/recipe_resource_access";
import { Recipe } from "src/eating/resource_access/recipe/recipe";
import { Restaurant } from "../resource_access/restaurant/restaurant";
import RestaurantResourceAccess from "../resource_access/restaurant/restaurant_resource_access";
import CuisineResourceAccess from "../resource_access/cuisine/cuisine_resource_access";
import { TFile } from "obsidian";

export default class EatingManager {
    readonly ingredientResourceAccess: IngredientResourceAccess;
    readonly recipeResourceAccess: RecipeResourceAccess;
    readonly restaurantResourceAccess: RestaurantResourceAccess;
    readonly cuisineResourceAccess: CuisineResourceAccess;

    constructor(ingredientResourceAccess: IngredientResourceAccess,
        recipeResourceAccess: RecipeResourceAccess,
        restaurantResourceAccess: RestaurantResourceAccess,
        cuisineResourceAccess: CuisineResourceAccess) {

        this.ingredientResourceAccess = ingredientResourceAccess;
        this.recipeResourceAccess = recipeResourceAccess;
        this.restaurantResourceAccess = restaurantResourceAccess;
        this.cuisineResourceAccess = cuisineResourceAccess;
    }


    async createRecipe(newRecipe: Recipe): Promise<TFile> {
        const tfile = await this.recipeResourceAccess.writeResource(newRecipe);
        for (const ingredientUsage of newRecipe.ingredientUsages) {
            if (!this.ingredientResourceAccess.exists(ingredientUsage.ingredient.name)) {
                await this.ingredientResourceAccess.writeResource(ingredientUsage.ingredient);
            }
        }
        return tfile;
    }

    async createRestaurant(newRestaurant: Restaurant): Promise<TFile> {
        const tfile = await this.restaurantResourceAccess.writeResource(newRestaurant);
        for (const cuisine of newRestaurant.cuisines) {
            if (!this.cuisineResourceAccess.exists(cuisine.name)) {
                await this.cuisineResourceAccess.writeResource(cuisine);
            }
        }
        return tfile;
    }
    
    async readAllRecipes() {
        return await this.recipeResourceAccess.readAll();
    }

    async readAllIngredients() {
        return await this.ingredientResourceAccess.readAll();
    }

    async readAllCuisines() {
        return await this.cuisineResourceAccess.readAll();
    }

    async addToRecipeLog(recipe: Recipe) {
        // TODO
    }
}