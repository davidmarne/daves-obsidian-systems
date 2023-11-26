
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { learningResourcesPath } from './learning_resource_resource_access';


type LearningResourceKind = "production" | "guitar" | "drums" | "synthesis" | "theory";
type LearningResourceKinds = ["production", "guitar", "drums", "synthesis", "theory"];

export class LearningResource extends Note {
    readonly kind: LearningResourceKind;
    
    constructor(name: string) {
        super(name, learningResourcesPath);
    }
}
