
import { TFile } from "obsidian";
import { Goal, GoalResourceAccess } from "../resource_access/goal";
import { Value, ValueResourceAccess } from "../resource_access/value";
import { Project, ProjectResourceAccess } from "../resource_access/project";
import { InboxResourceAccess } from "../resource_access/inbox";

export default class GtdManager {
    readonly projectResourceAccess: ProjectResourceAccess;
    readonly goalResourceAccess: GoalResourceAccess;
    readonly valueResourceAccess: ValueResourceAccess;
    readonly inboxResourceAccess: InboxResourceAccess;

    constructor(projectResourceAccess: ProjectResourceAccess,
        goalResourceAccess: GoalResourceAccess,
        valueResourceAccess: ValueResourceAccess,
        inboxResourceAccess: InboxResourceAccess) {

        this.projectResourceAccess = projectResourceAccess;
        this.goalResourceAccess = goalResourceAccess;
        this.valueResourceAccess = valueResourceAccess;
        this.inboxResourceAccess = inboxResourceAccess;
    }


    async createGoal(newGoal: Goal): Promise<TFile> {
        const tfile = await this.goalResourceAccess.writeResource(newGoal);
        // for (const projectUsage of newGoal.projectUsages) {
        //     if (!this.projectResourceAccess.exists(projectUsage.project.name)) {
        //         await this.projectResourceAccess.writeResource(projectUsage.project);
        //     }
        // }
        return tfile;
    }

    async createValue(newValue: Value): Promise<TFile> {
        const tfile = await this.valueResourceAccess.writeResource(newValue);
        // for (const inbox of newValue.inboxs) {
        //     if (!this.inboxResourceAccess.exists(inbox)) {
        //         await this.inboxResourceAccess.writeResource(new Inbo(inbox));
        //     }
        // }
        return tfile;
    }

    async createProject(newValue: Project): Promise<TFile> {
        const tfile = await this.projectResourceAccess.writeResource(newValue);
        // for (const inbox of newValue.inboxs) {
        //     if (!this.inboxResourceAccess.exists(inbox)) {
        //         await this.inboxResourceAccess.writeResource(new Inbo(inbox));
        //     }
        // }
        return tfile;
    }
    
    async listGoals() {
        return this.goalResourceAccess.list();
    }

    async readGoal(path: string) {
        return this.goalResourceAccess.readResourceByPath(path);
    }

    async listProjects() {
        return this.projectResourceAccess.list();
    }

    async listInboxs() {
        return this.inboxResourceAccess.list();
    }

    async listValues() {
        return this.valueResourceAccess.list();
    }

    async readValue(path: string) {
        return this.valueResourceAccess.readResourceByPath(path);
    }

    async readProject(path: string) {
        return this.projectResourceAccess.readResourceByPath(path);
    }

    async addToGoalLog(goal: Goal) {
        console.log("TODO: addToGoalLog", goal);
    }

    async addToValueLog(value: Value) {
        console.log("TODO: addToValueLog", value);
    }
}