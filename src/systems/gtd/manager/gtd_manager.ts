
import { TFile } from "obsidian";
import { Goal } from "../resource_access/goal";
import { Value } from "../resource_access/value";
import { Project } from "../resource_access/project";
import { IResourceAccess } from "src/common/resource_access";
import { Inbox } from "../resource_access/inbox";

export default class GtdManager {
    readonly projectResourceAccess: IResourceAccess<Project>;
    readonly goalResourceAccess: IResourceAccess<Goal>;
    readonly valueResourceAccess: IResourceAccess<Value>;
    readonly inboxResourceAccess: IResourceAccess<Inbox>;

    constructor(projectResourceAccess: IResourceAccess<Project>,
        goalResourceAccess: IResourceAccess<Goal>,
        valueResourceAccess: IResourceAccess<Value>,
        inboxResourceAccess: IResourceAccess<Inbox>) {

        this.projectResourceAccess = projectResourceAccess;
        this.goalResourceAccess = goalResourceAccess;
        this.valueResourceAccess = valueResourceAccess;
        this.inboxResourceAccess = inboxResourceAccess;
    }


    async writeGoal(newGoal: Goal): Promise<void> {
        await this.goalResourceAccess.write(newGoal);
    }

    async writeValue(newValue: Value): Promise<void> {
        await this.valueResourceAccess.write(newValue);
    }

    async writeProject(newValue: Project): Promise<void> {
        await this.projectResourceAccess.write(newValue);
    }
    
    async listGoals() {
        return this.goalResourceAccess.list();
    }

    async readGoal(name: string) {
        return this.goalResourceAccess.read(name);
    }

    async listProjects() {
        return this.projectResourceAccess.list();
    }

    async readInbox() {
        let inboxes = await this.inboxResourceAccess.list();
        return inboxes.first() || {
            directory: 'gtd/inbox/',
            name: 'inbox',
            tasks: []
        };
    }

    async writeInbox(inbox: Inbox) {
        await this.inboxResourceAccess.write(inbox);
    }

    async listValues() {
        return this.valueResourceAccess.list();
    }

    async readValue(name: string) {
        return this.valueResourceAccess.read(name);
    }

    async readProject(name: string) {
        return this.projectResourceAccess.read(name);
    }

    async addToGoalLog(goal: Goal) {
        console.log("TODO: addToGoalLog", goal);
    }

    async addToValueLog(value: Value) {
        console.log("TODO: addToValueLog", value);
    }
}