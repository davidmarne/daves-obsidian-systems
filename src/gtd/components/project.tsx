import { App, Modal } from 'obsidian';
import { GenericForm, multiSelectFormElement, multilineStringFormElement, selectFormElement, stringFormElement } from 'src/common/generic_forms';
import GtdManager from '../manager/gtd_manager';
import { Project } from '../resource_access/project';
import * as React from 'react';

export const getProjectEditView = (app: App, gtdManager: GtdManager) => async (path?: string, onSubmit?: (project: Project) => void) => {
    const defaultProject = path !== undefined 
        ? await gtdManager.readProject(path) 
        : undefined;

    const goals = await gtdManager.listGoals();

    return <GenericForm
        defaultState={defaultProject || new Project("", "", "", [], [])}
        config={        {
            name: stringFormElement,
            description: multilineStringFormElement,
            why: multilineStringFormElement,
            goals: multiSelectFormElement(goals.map(it => it.name)),
            tasks: null,
            directory: null,
            path: null,
            link: null,
            tableLink: null
        }}
        onChange={async (project) => {
            const tfile = await gtdManager.createProject(project);
            app.workspace.getLeaf(false).openFile(tfile);
            onSubmit && onSubmit(project);
        }}
        />;
}