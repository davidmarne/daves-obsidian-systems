import { AssertionError } from 'assert';
import { Root } from 'mdast';
import { parseYaml } from 'obsidian';
import { LearningResource, LearningResourceKind } from 'src/music/resource_access/learning_resource/learning_resource';
import { Instrument } from '../practice_exercise/practice_exercise';


export const learningResourceFromAst = (name: string, ast: Root): LearningResource => {
    const frontmatter = ast.children[0];
    if (frontmatter.type !== 'yaml') throw new AssertionError({message: "invalid ast", actual: frontmatter.type})
    const frontmatterData = parseYaml(frontmatter.value)

    return new LearningResource(
        name,
        frontmatterData['kind'] as LearningResourceKind,
        frontmatterData['source']
    );
}
