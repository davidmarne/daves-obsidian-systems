import { App, Modal } from 'obsidian';
import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import { CreateInspirationForm } from "./internal/CreateInspirationForm";
import MusicManager from '../managers/music_manager';
import { getUrlStringFromClipboard } from 'src/common/url_util';
import { Inspiration } from '../resource_access/inspiration/inspiration';

export const getInspirationEditView = (app: App, musicManager: MusicManager) => async (path?: string, onSubmit?: (inspiration: Inspiration) => void) => {
    const projects = await musicManager.readAllProjects();
    const defaultInspiration = path !== undefined 
        ? await musicManager.readInspiration(path) 
        : undefined;
        
    const defaultSource = await getUrlStringFromClipboard();
    return <CreateInspirationForm
        defaultInspiration={defaultInspiration}
        defaultSource={defaultSource}
        projects={projects}
        handleSubmit={async (inspiration) => {
            const tfile = await musicManager.createInspiration(inspiration);
            app.workspace.getLeaf(false).openFile(tfile);
            onSubmit && onSubmit(inspiration);
        }} />;
}