
import { App } from 'obsidian';
import { Note } from '../../../common/note';
import { projectsPath } from './project_resource_access';

type ProjectKind = "djset" | "single" | "ep" | "mixtape" | "lp";
type ProjectKinds = ["djset", "single", "ep", "mixtape", "lp"];

export class Project extends Note {
    readonly kind: ProjectKind;

    constructor(name: string) {
        super(name, projectsPath);
    }
}
