import { Root, Yaml } from 'mdast';
import { stringifyYaml } from 'obsidian';
import { Lyric } from './lyric';


export const lyricToAst = (lyric: Lyric): Root => {
    return {
        type: "root",
        children: [
            frontMatter(lyric),
        ]
    }
}

const frontMatter = (lyric: Lyric): Yaml => {
    return {
        type: "yaml",
        value: stringifyYaml(frontMatterData(lyric))
    }
}

const frontMatterData = (lyric: Lyric): object => {
    return {
        $schema: `lyric.schema.json`,
    }
}
