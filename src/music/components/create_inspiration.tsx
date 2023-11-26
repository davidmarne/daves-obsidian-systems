import { App, Modal } from 'obsidian';
import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import { CreateInspirationForm } from "./internal/CreateInspirationForm";
import MusicManager from '../managers/music_manager';
import { getUrlStringFromClipboard } from 'src/common/url_util';

export class CreateInspirationModal extends Modal {
    manager: MusicManager;

    constructor(app: App, manager: MusicManager) {
        super(app);
        this.manager = manager;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        renderForm(this.app, this.manager, contentEl, () => this.close())
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

const renderForm = async (app: App, musicManager: MusicManager, container: HTMLElement, close: () => void) => {
    const projects = await musicManager.readAllProjects();
    const defaultSource = await getUrlStringFromClipboard();
    renderMuiInShadowDom(
        container,
        <CreateInspirationForm
            defaultSource={defaultSource}
            projects={projects}
            handleSubmit={async (inspiration) => {
                const tfile = await musicManager.createInspiration(inspiration);
                app.workspace.getLeaf(false).openFile(tfile);
                close();
            }} />
    );
}