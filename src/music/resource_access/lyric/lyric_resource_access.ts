import { Lyric } from "src/music/resource_access/lyric/lyric";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { lyricFromAst } from "./lyric_from_ast";
import { lyricToAst } from "./lyric_to_ast";

export const lyricsPath = 'music/lyric/';

export default class LyricResourceAccess extends ResourceAccess<Lyric> {
    constructor(app: App) {
        super(app, lyricsPath);
    }
    
    protected override fromAst(name: string, ast: Root): Lyric {
        return lyricFromAst(name, ast);
    }

    protected override toAst(resource: Lyric): Root {
        return lyricToAst(resource);
    }
}