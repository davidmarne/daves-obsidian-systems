import { renderMuiInShadowDom } from "src/common/Shadow";
import { App, Modal, TFile } from 'obsidian';
import * as React from 'react';
import EntertainmentManager from "../manager/entertainment_manager";
import { WhatToDoForm } from "./internal/WhatToDo";
import { path } from "src/common/mdast_serializer";

export class WhatToDoModal extends Modal {
    manager: EntertainmentManager;

    constructor(app: App, manager: EntertainmentManager) {
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

const renderForm = async (app: App, entertainmentManager: EntertainmentManager, container: HTMLElement, close: () => void) => {
    const entertainmentContents = await entertainmentManager.listEntertainmentContent();
    renderMuiInShadowDom(
        container,
        <WhatToDoForm
            entertainmentContents={entertainmentContents}
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