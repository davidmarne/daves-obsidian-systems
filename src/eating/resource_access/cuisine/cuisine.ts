
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { cuisinesPath } from './cuisine_resource_access';

export class Cuisine extends Note {
    constructor(name: string) {
        super(name, cuisinesPath);
    }
}
