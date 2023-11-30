import { Editor, MarkdownFileInfo, MarkdownView, View, WorkspaceLeaf } from 'obsidian';
import { renderMuiInShadowDom } from 'src/common/Shadow';
import { Root } from 'react-dom/client';
import DavesObsidianSystems from 'main';
import { EditResourceComponentFactories, getComponentFactoryForFilePath } from './EditResourceComponentFactory';
import React, { ReactElement } from 'react';

export const EDIT_RESOURCE_VIEW_TYPE_KEY = "EDIT_RESOURCE_VIEW";

export class EditResourceView extends View {
	readonly plugin: DavesObsidianSystems;
	readonly components: EditResourceComponentFactories;
	rerender: (element: ReactElement) => void;

	constructor(leaf: WorkspaceLeaf, plugin: DavesObsidianSystems, components: EditResourceComponentFactories) {
		super(leaf);
		this.plugin = plugin;
		this.components = components;
		this.registerEvent(plugin.app.workspace.on('active-leaf-change', (leaf: WorkspaceLeaf | null) => this.onFileChange()));
		this.registerEvent(plugin.app.workspace.on('editor-change', (editor: Editor, info: MarkdownView | MarkdownFileInfo) => this.onFileChange()));
	}

	getViewType() {
		return EDIT_RESOURCE_VIEW_TYPE_KEY;
	}

	getDisplayText() {
		return "Edit Form";
	}

	getIcon() {
		return "alert-triangle";
	}

	onFileChange() {
		this.render();
	}

	async onOpen() {
		this.render();
	}

	async render() {
		const renderFn = this.rerender || ((child) => {
			this.rerender = renderMuiInShadowDom(this.containerEl, child);
		});
		const tfile = this.app.workspace.getActiveFile();
		if (tfile === null) {
			const child = React.createElement('div', null, "no active file")
			renderFn(child)
			return;
		}

		const componentFactory = getComponentFactoryForFilePath(this.components, tfile);
		if (!componentFactory) {
			const child = React.createElement('div', null, "no componentFactory for file")
			renderFn(child)
			return;
		}

		const child = await componentFactory(tfile.path);
		renderFn(child);
	}
}
