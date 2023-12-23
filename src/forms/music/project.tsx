import * as React from 'react';
import { GenericForm, multiSelectOrCreate, multilineStringFormElement, selectFormElement, stringFormElement } from "src/common/generic_forms";
import MusicManager from 'src/systems/music/managers/music_manager';
import { MusicProject, ProjectKinds, defaultMusicProject } from 'src/systems/music/resource_access/project';


export const getMusicProjectEditView = (musicManager: MusicManager) => async (path?: string, onSubmit?: (project: MusicProject) => void) => {
    const project = path !== undefined
        ? await musicManager.readProject(path)
        : defaultMusicProject();


    return <GenericForm
        defaultState={project}
        config={{
            directory: null,
            name: stringFormElement,
            // kind: selectFormElement(ProjectKinds),
            // TODO: kind
            kind: null,
            description: multilineStringFormElement,
        }}
        onChange={async (project: MusicProject) => {
            await musicManager.writeProject(project);
            onSubmit && onSubmit(project);
        }} />;
}