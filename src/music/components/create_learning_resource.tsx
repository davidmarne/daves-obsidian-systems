import { App, Modal } from 'obsidian';
import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import { CreateLearningResourceForm } from "./internal/CreateLearningResourceForm";
import MusicManager from '../managers/music_manager';
import { getUrlStringFromClipboard } from 'src/common/url_util';

export class CreateLearningResourceModal extends Modal {
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
    const defaultSource = await getUrlStringFromClipboard();
    renderMuiInShadowDom(
        container,
        <CreateLearningResourceForm
            defaultSource={defaultSource}
            handleSubmit={async (learningResource) => {
                const tfile = await musicManager.createLearningResource(learningResource);
                app.workspace.getLeaf(false).openFile(tfile);
                close();
            }} />
    );
}