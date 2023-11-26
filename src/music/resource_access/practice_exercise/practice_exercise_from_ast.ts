import { AssertionError } from 'assert';
import { Root } from 'mdast';
import { parseYaml } from 'obsidian';
import { Instrument, PracticeExercise } from 'src/music/resource_access/practice_exercise/practice_exercise';


export const practiceExerciseFromAst = (name: string, ast: Root): PracticeExercise => {
    const frontmatter = ast.children[0];
    if (frontmatter.type !== 'yaml') throw new AssertionError({message: "invalid ast", actual: frontmatter.type})
    const frontmatterData = parseYaml(frontmatter.value)

    return new PracticeExercise(
        name,
        frontmatterData['instrument'] as Instrument,
        frontmatterData['source'],
    );
}
