import { EditResourceComponentFactories, EditResourceComponentFactory } from 'src/common/EditResourceComponentFactory';
import { App, Modal } from "obsidian";
import EatingManager from "src/eating/managers/eating_manager";
import { Root } from 'react-dom/client';
import { renderMuiInShadowDom } from './Shadow';


export class EditResourceModal extends Modal {
	readonly componentFactory: EditResourceComponentFactory;
	readonly reactRoot: Root;
    readonly path: string;

    constructor(app: App, componentFactory: EditResourceComponentFactory, path: string) {
        super(app);
        this.componentFactory = componentFactory;
        this.path = path;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
		this.componentFactory(this.path, () => this.close())
			.then(child => renderMuiInShadowDom(contentEl, child));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}