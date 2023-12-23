import { EditResourceComponentFactories, EditResourceComponentFactory } from 'src/common/EditResourceComponentFactory';
import { App, Modal } from "obsidian";
import { Root } from 'react-dom/client';
import { renderMuiInShadowDom } from './Shadow';
import { NoteFormComponentFactory } from 'src/forms/note_forms';
import { Note } from './note';


export class EditResourceModal extends Modal {
	readonly componentFactory: NoteFormComponentFactory<any>;
	readonly reactRoot: Root;
    readonly name: string;

    constructor(app: App, componentFactory: NoteFormComponentFactory<any>, name: string) {
        super(app);
        this.componentFactory = componentFactory;
        this.name = name;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
		this.componentFactory(this.name, () => this.close())
			.then(child => renderMuiInShadowDom(contentEl, child));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}