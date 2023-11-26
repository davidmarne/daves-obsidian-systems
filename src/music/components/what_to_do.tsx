import { renderMuiInShadowDom } from "src/common/Shadow";
import { App, Modal, TFile } from 'obsidian';
import * as React from 'react';
import MusicManager from "../managers/music_manager";
import { WhatToDoForm } from "./internal/WhatToDoForm";

export class WhatToDoModal extends Modal {
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
    const inpsirations = await musicManager.readAllInspirations();
    const practiceExercises = await musicManager.readAllPracticeExercises();
    const learningResources = await musicManager.readAllLearningResources();
    renderMuiInShadowDom(
        container,
        <WhatToDoForm
            inspirations={inpsirations}
            practiceExercises={practiceExercises}
            leaningResources={learningResources}
            handleSubmit={(selection) => {
                const tfile =  app.vault.getAbstractFileByPath(selection.path())
                if (tfile !== null && tfile instanceof TFile) {
                    app.workspace.getLeaf(false).openFile(tfile);
                } else {
                    console.log("invalid selection returned from WhatToDoForm", selection)
                }
                close();
            }} />
    );
}