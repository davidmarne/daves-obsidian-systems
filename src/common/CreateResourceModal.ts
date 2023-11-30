import { App, Modal } from "obsidian";
import { Root } from 'react-dom/client';
import { EditResourceComponentFactory } from 'src/common/EditResourceComponentFactory';
import { renderMuiInShadowDom } from './Shadow';


export class CreateResourceModal extends Modal {
	readonly componentFactory: EditResourceComponentFactory;
	readonly reactRoot: Root;


    constructor(app: App, componentFactory: EditResourceComponentFactory) {
        super(app);
        this.componentFactory = componentFactory;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
		this.componentFactory(undefined, () => this.close())
			.then(child => renderMuiInShadowDom(contentEl, child));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}