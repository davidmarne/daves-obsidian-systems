
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { learningResourcesPath } from './learning_resource_resource_access';


export const LearningResourceKinds = ["production", "guitar", "drums", "synthesis", "theory"] as const;
export type LearningResourceKind = typeof LearningResourceKinds[number];

export class LearningResource extends Note {
    readonly kind: LearningResourceKind;
    readonly source?: string;
    
    constructor(name: string, kind: LearningResourceKind, source?: string) {
        super(name, learningResourcesPath);
        this.kind = kind;
        this.source = source;
    }
}
