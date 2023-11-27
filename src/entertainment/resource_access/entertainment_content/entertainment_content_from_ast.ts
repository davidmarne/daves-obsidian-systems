import { AssertionError } from 'assert';
import { Root } from 'mdast';
import { parseYaml } from 'obsidian';
import { EntertainmentContent } from 'src/entertainment/resource_access/entertainment_content/entertainment_content';


export const entertainmentContentFromAst = (name: string, ast: Root): EntertainmentContent => {
    const frontmatter = ast.children[0];
    if (frontmatter.type !== 'yaml') throw new AssertionError({message: "invalid ast", actual: frontmatter.type})
    const frontmatterData = parseYaml(frontmatter.value)

    return new EntertainmentContent(
        name,
        frontmatterData["kind"],
        frontmatterData["state"],
        frontmatterData["anticipation"],
        frontmatterData["rating"],
    )
}
