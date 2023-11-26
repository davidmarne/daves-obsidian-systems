import { Project } from "src/music/resource_access/project/project";
import ResourceAccess from "src/common/resource_access";
import { Root } from "mdast";
import { App } from "obsidian";
import { projectFromAst } from "./project_from_ast";
import { projectToAst } from "./project_to_ast";

export const projectsPath = 'music/project/';

export default class ProjectResourceAccess extends ResourceAccess<Project> {
    constructor(app: App) {
        super(app, projectsPath);
    }
    
    protected override fromAst(name: string, ast: Root): Project {
        return projectFromAst(name, ast);
    }

    protected override toAst(resource: Project): Root {
        return projectToAst(resource);
    }
}