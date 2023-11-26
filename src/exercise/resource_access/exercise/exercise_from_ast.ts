import { Root } from 'mdast';
import { Exercise } from './exercise';


export const exerciseFromAst = (name: string, ast: Root): Exercise => {
    return new Exercise(name)
}
