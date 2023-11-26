import { EntertainmentContent } from "src/entertainment/resource_access/entertainment_content/entertainment_content";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { entertainmentContentFromAst } from "./entertainment_content_from_ast";
import { entertainmentContentToAst } from "./entertainment_content_to_ast";

export const entertainmentContentsPath = 'entertainment/entertainment_content/';

export default class EntertainmentContentResourceAccess extends ResourceAccess<EntertainmentContent> {
    constructor(app: App) {
        super(app, entertainmentContentsPath);
    }
    
    protected override fromAst(name: string, ast: Root): EntertainmentContent {
        return entertainmentContentFromAst(name, ast);
    }

    protected override toAst(resource: EntertainmentContent): Root {
        return entertainmentContentToAst(resource);
    }
}