
import { Note } from '../../../common/note';

export const LearningResourceKinds = ["production", "guitar", "drums", "synthesis", "theory"] as const;
export type LearningResourceKind = typeof LearningResourceKinds[number];

export const defaultLearningResource = () => ({
    directory: 'music/learning_resource/',
    kind: LearningResourceKinds[0],
    source: '',
    description: '',
});

export interface LearningResource extends Note {
    readonly directory: 'music/learning_resource/'
    readonly kind: LearningResourceKind;
    readonly source?: string;
    readonly description: string;
}
