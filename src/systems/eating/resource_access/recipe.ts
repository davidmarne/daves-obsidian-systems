import { Moment } from 'moment';
import { Note } from '../../../common/note';


import { Ingredient } from './ingredient';
import { Reference } from 'src/systems/travel/resource_access/location';


export type RecipeKind = "entre" | "side" | "dessert" | "breakfast" | "snack" | "cocktail";
export const RecipeKinds: RecipeKind[] = ["entre", "side", "dessert", "breakfast", "snack", "cocktail"];

export interface IngredientUsage {
    ingredient: Reference<Ingredient>,
    amount: number,
    unit: string,
}

export const IngredientUnits: string[] = ['', 'cup', 'oz', 'teaspoon', 'tablespoon', 'gram'];

export interface RecipeLog {
    date: Moment,
    rating: number,
    notes: string
}

export interface Recipe extends Note {
    readonly directory: 'eating/recipe/',
    readonly kind: RecipeKind,
    readonly ingredientUsages: IngredientUsage[],
    readonly source: string,
    readonly description: string,
    readonly log: RecipeLog[],
}

