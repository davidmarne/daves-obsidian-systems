import moment from "moment";
import { GenericForm, dateColumn, multiSelectFormElement, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import EatingManager from "src/systems/eating/managers/eating_manager";
import GtdManager from "src/systems/gtd/manager/gtd_manager";
import { Project, defaultProject } from "src/systems/gtd/resource_access/project";


export const getProjectEditView = (gtdManager: GtdManager) => async (path?: string, onSubmit?: (project: Project) => void) => {
    const project = path !== undefined
        ? await gtdManager.readProject(path)
        : defaultProject();

    const goals = await gtdManager.listGoals();

    return <GenericForm
        defaultState={project}
        config={{
            directory: null,
            name: stringFormElement,
            why: multilineStringFormElement,
            description: multilineStringFormElement,
            goals: multiSelectFormElement(goals.map(it => it.name)),
            // TODO: tasks
            tasks: null,
        }}
        onChange={async (project: Project) => {
            await gtdManager.writeProject(project);
            onSubmit && onSubmit(project);
        }} />;
}