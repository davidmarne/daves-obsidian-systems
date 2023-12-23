import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import MusicManager from "src/systems/music/managers/music_manager";
import { Inspiration, defaultInspiration } from "src/systems/music/resource_access/inspiration";


export const getInspirationEditView = (musicManager: MusicManager) => async (path?: string, onSubmit?: (value: Inspiration) => void) => {
    const value = path !== undefined
        ? await musicManager.readInspiration(path)
        : defaultInspiration();

    // TODO: only list metadata for perf, this reads the files and parses ast
    // but all i need is a name
    const projects = await musicManager.listProjects();

    return <GenericForm
        defaultState={value}
        config={{
            directory: null,
            name: stringFormElement,
            kind: null, // TODO: kind
            source: stringFormElement,
            description: multilineStringFormElement,
            projects: multiSelectOrCreate(projects.map(it => it.name))
        }}
        onChange={async (value: Inspiration) => {
            await musicManager.writeInspiration(value);
            onSubmit && onSubmit(value);
        }} />;
}