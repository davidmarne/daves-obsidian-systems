import { Root } from 'mdast';
import { Lyric } from 'src/music/resource_access/lyric/lyric';


export const lyricFromAst = (name: string, ast: Root): Lyric => {
    return new Lyric(name)
}
