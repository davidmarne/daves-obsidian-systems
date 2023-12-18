import { Moment } from "moment";
import { Note } from "src/common/note";
import { Reference } from "src/travel/resource_access/location";
import ResourceAccess from "src/common/resource_access";
import { App } from "obsidian";
import { Goal } from "./goal";
import { Root } from "mdast";
import { projectFromAst2, projectToAst, projectToAst2 } from "./project/project_to_ast";

export type Task = string

export const projectPath = 'gtd/project';

export class Project extends Note {
    readonly goals: Reference<Goal>[];
    readonly why: string;
    readonly description: string;
    readonly tasks: Task[];
    
    constructor(name: string, why: string, description: string, goals: Reference<Goal>[], tasks: Task[]) {
        super(name, projectPath);
        this.why = why;
        this.tasks = tasks;
        this.goals = goals;
        this.description = description;
    }
}

export class ProjectResourceAccess extends ResourceAccess<Project> {
    constructor(app: App) {
        super(app, projectPath);
    }
    
    protected override fromAst(name: string, ast: Root): Project {
       return projectFromAst2(name, ast);
    }

    protected override toAst(resource: Project): Root {
        return projectToAst2(resource);
    }
}
