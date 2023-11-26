import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { PracticeExercise } from './practice_exercise';


export const practiceExerciseToAst = (practiceExercise: PracticeExercise): Root => {
    return {
        type: "root",
        children: [
            frontMatter(practiceExercise),
        ]
    }
}

const frontMatter = (practiceExercise: PracticeExercise): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(practiceExercise))
    }
}

const frontMatterData = (practiceExercise: PracticeExercise): object => {
    return {
        $schema: `practice_exercise.schema.json`,
    }
}
