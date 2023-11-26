import { Root } from 'mdast';
import { Inspiration } from 'src/music/resource_access/inspiration/inspiration';


export const inspirationFromAst = (name: string, ast: Root): Inspiration => {
    return new Inspiration(name)
}
