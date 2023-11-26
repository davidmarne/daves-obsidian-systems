import { Root } from 'mdast';
import { Project } from 'src/music/resource_access/project/project';


export const projectFromAst = (name: string, ast: Root): Project => {
    return new Project(name)
}
