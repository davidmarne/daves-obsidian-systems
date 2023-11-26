import { Moment } from 'moment';
import { Note } from '../../../common/note';


import { Ingredient } from '../ingredient/ingredient';
import { recipesPath } from './recipe_resource_access';

export type RecipeKind = "entre" | "side" | "dessert" | "breakfast" | "snack" | "cocktail";
export const RecipeKinds: RecipeKind[] = ["entre", "side", "dessert", "breakfast", "snack", "cocktail"];

export interface IngredientUsage {
    ingredient: Ingredient,
    amount: number,
    unit: string,
}

export type IngredientUnit = 'cup' | 'oz' | 'teaspoon' | 'tablespoon' | 'gram';
export const IngredientUnits: IngredientUnit[] = ['cup', 'oz', 'teaspoon', 'tablespoon', 'gram'];

export interface RecipeLog {
    date: Moment,
    rating: number,
    notes: string
}

export class Recipe extends Note {
    readonly kind: RecipeKind;
    readonly ingredientUsages: IngredientUsage[];
    readonly source: URL;
    readonly description: string;
    readonly log: RecipeLog[];
    
    constructor(name: string, kind: RecipeKind, ingredientUsages: IngredientUsage[], url: URL, description: string, log: RecipeLog[]) {
        super(name, recipesPath);
        this.kind = kind;
        this.ingredientUsages = ingredientUsages;
        this.source = url;
        this.description = description;
        this.log = log;
    }
}

