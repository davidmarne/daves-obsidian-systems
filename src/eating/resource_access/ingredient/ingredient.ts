
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { ingredientsPath } from './ingredient_resource_access';

export class Ingredient extends Note {
    constructor(name: string) {
        super(name, ingredientsPath);
    }
}
