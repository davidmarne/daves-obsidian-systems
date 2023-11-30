import { TFile } from 'obsidian';
import { ReactElement } from 'react';
import { Note } from 'src/common/note';


export type EditResourceComponentFactory = (path?: string, onSubmit?: (value: Note) => void) => Promise<ReactElement>;

export interface EditResourceComponentFactories {
    [key: string]: EditResourceComponentFactory
}

export const getComponentFactoryForFilePath = (factories: EditResourceComponentFactories, file: TFile) => {
    const path = file.parent?.path || '/';
    return factories[path];
}