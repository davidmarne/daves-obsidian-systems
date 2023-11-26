import { Root } from 'mdast';
import { EntertainmentContent } from 'src/entertainment/resource_access/entertainment_content/entertainment_content';


export const entertainmentContentFromAst = (name: string, ast: Root): EntertainmentContent => {
    return new EntertainmentContent(name)
}
