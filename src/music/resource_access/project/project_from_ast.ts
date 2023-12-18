import { Root } from 'mdast';
import { MusicProject } from 'src/music/resource_access/project/project';


export const projectFromAst = (name: string, ast: Root): MusicProject => {
    return new MusicProject(name)
}
