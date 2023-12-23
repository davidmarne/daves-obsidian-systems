import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import MusicManager from "src/systems/music/managers/music_manager";
import { Lyric, defaultLyric } from "src/systems/music/resource_access/lyric";


export const getLyricEditView = (musicManager: MusicManager) => async (path?: string, onSubmit?: (value: Lyric) => void) => {
    const value = path !== undefined
        ? await musicManager.readLyric(path)
        : defaultLyric();

    // TODO: only list metadata for perf, this reads the files and parses ast
    // but all i need is a name
    const projects = await musicManager.listProjects();

    return <GenericForm
        defaultState={value}
        config={{
            directory: null,
            name: stringFormElement,
            kind: null, // TODO: kind
            content: stringFormElement,
            projects: multiSelectOrCreate(projects.map(it => it.name))
        }}
        onChange={async (value: Lyric) => {
            await musicManager.writeLyric(value);
            onSubmit && onSubmit(value);
        }} />;
}