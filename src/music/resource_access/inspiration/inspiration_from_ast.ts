import { AssertionError } from 'assert';
import { Root } from 'mdast';
import { parseYaml } from 'obsidian';
import { parseWikiLink } from 'src/common/wiki_link_utils';
import { Inspiration } from 'src/music/resource_access/inspiration/inspiration';
import { Project } from '../project/project';


export const inspirationFromAst = (name: string, ast: Root): Inspiration => {
    const frontmatter = ast.children[0];
    if (frontmatter.type !== 'yaml') throw new AssertionError({message: "invalid ast", actual: frontmatter.type})
    const frontmatterData = parseYaml(frontmatter.value)

    return new Inspiration(
        name, 
        frontmatterData["kind"], 
        frontmatterData['projects'].map(parseWikiLink).map((it: string) => new Project(it)),
        frontmatterData["source"])
}
