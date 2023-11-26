import { LearningResource } from "src/music/resource_access/learning_resource/learning_resource";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { learningResourceFromAst } from "./learning_resource_from_ast";
import { learningResourceToAst } from "./learning_resource_to_ast";

export const learningResourcesPath = 'eating/learning_resource/';

export default class LearningResourceResourceAccess extends ResourceAccess<LearningResource> {
    constructor(app: App) {
        super(app, learningResourcesPath);
    }
    
    protected override fromAst(name: string, ast: Root): LearningResource {
        return learningResourceFromAst(name, ast);
    }

    protected override toAst(resource: LearningResource): Root {
        return learningResourceToAst(resource);
    }
}