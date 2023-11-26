import { App, Modal } from 'obsidian';
import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import { CreateEntertainmentContentForm } from "./internal/CreateEntertainmentContentForm";
import { getUrlStringFromClipboard } from 'src/common/url_util';
import EntertainmentManager from '../manager/entertainment_manager';

export class CreateEntertainmentContentModal extends Modal {
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

const renderForm = async (app: App, manager: EntertainmentManager, container: HTMLElement, close: () => void) => {
    renderMuiInShadowDom(
        container,
        <CreateEntertainmentContentForm
            handleSubmit={async (entertainmentContent) => {
                const tfile = await manager.createEntertainmentContent(entertainmentContent);
                app.workspace.getLeaf(false).openFile(tfile);
                close();
            }} />
    );
}