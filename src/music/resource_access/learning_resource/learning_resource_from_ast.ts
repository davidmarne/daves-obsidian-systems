import { Root } from 'mdast';
import { LearningResource } from 'src/music/resource_access/learning_resource/learning_resource';


export const learningResourceFromAst = (name: string, ast: Root): LearningResource => {
    return new LearningResource(name)
}
