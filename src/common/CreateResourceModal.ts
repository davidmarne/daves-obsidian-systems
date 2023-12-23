import { App, Modal, TFile } from "obsidian";
import { Root } from 'react-dom/client';
import { EditResourceComponentFactory } from 'src/common/EditResourceComponentFactory';
import { renderMuiInShadowDom } from './Shadow';
import { path } from "./mdast_serializer";
import { NoteFormComponentFactory } from "src/forms/note_forms";
import { Note } from "./note";


export class CreateResourceModal extends Modal {
	readonly componentFactory: NoteFormComponentFactory<any>;
	readonly reactRoot: Root;


    constructor(app: App, componentFactory: NoteFormComponentFactory<any>) {
        super(app);
        this.componentFactory = componentFactory;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
		this.componentFactory(undefined, (data) => {
            const tfile = this.app.vault.getAbstractFileByPath(path(data.directory, data.name))
            if (tfile !== null && tfile instanceof TFile) {
                this.app.workspace.getLeaf(false).openFile(tfile);
            }
            this.close();
        })
		.then(child => renderMuiInShadowDom("id", contentEl, child));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}