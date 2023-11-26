import { renderMuiInShadowDom } from "src/common/Shadow";
import { App, Modal } from 'obsidian';
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
        renderForm(this.manager, contentEl, () => this.close())
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

const renderForm = async (musicManager: MusicManager, container: HTMLElement, close: () => void) => {
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
                console.log(selection)
                close();
            }} />
    );
}