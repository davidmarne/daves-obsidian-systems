import { renderMuiInShadowDom } from "src/common/Shadow";
import { App, Modal, TFile } from 'obsidian';
import * as React from 'react';
import MusicManager from "../managers/music_manager";
import { WhatToDoForm } from "./internal/WhatToDoForm";
import { path } from "src/common/mdast_serializer";

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
    const inpsirations = await musicManager.listInspirations();
    const practiceExercises = await musicManager.listPracticeExercises();
    const learningResources = await musicManager.listLearningResources();
    renderMuiInShadowDom(
        "whattodo",
        container,
        <WhatToDoForm
            inspirations={inpsirations}
            practiceExercises={practiceExercises}
            leaningResources={learningResources}
            handleSubmit={(selection) => {
                const tfile =  app.vault.getAbstractFileByPath(path(selection.directory, selection.name))
                if (tfile !== null && tfile instanceof TFile) {
                    app.workspace.getLeaf(false).openFile(tfile);
                } else {
                    console.log("invalid selection returned from WhatToDoForm", selection)
                }
                close();
            }} />
    );
}