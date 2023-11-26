
import { Note } from '../../../common/note';
import { projectsPath } from './project_resource_access';

export const ProjectKinds = ["djset", "single", "ep", "mixtape", "lp"] as const;
export type ProjectKind = typeof ProjectKinds[number];

export class Project extends Note {
    readonly kind: ProjectKind;

    constructor(name: string) {
        super(name, projectsPath);
    }
}
