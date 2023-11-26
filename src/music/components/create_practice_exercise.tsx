import { App, Modal } from 'obsidian';
import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import { CreatePracticeExerciseForm } from "./internal/CreatePracticeExerciseForm";
import MusicManager from '../managers/music_manager';
import { getUrlStringFromClipboard } from 'src/common/url_util';

export class CreatePracticeExerciseModal extends Modal {
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
        <CreatePracticeExerciseForm
            defaultSource={defaultSource}
            handleSubmit={async (practiceExercise) => {
                const tfile = await musicManager.createPracticeExercise(practiceExercise);
                app.workspace.getLeaf(false).openFile(tfile);
                close();
            }} />
    );
}