import { Editor, MarkdownFileInfo, MarkdownView, View, WorkspaceLeaf } from 'obsidian';
import { renderMuiInShadowDom } from 'src/common/Shadow';
import { Root } from 'react-dom/client';
import DavesObsidianSystems from 'main';
import { EditResourceComponentFactories, getComponentFactoryForFilePath } from './EditResourceComponentFactory';
import React, { ReactElement } from 'react';
import { NoteForm } from 'src/forms/note_forms';

export const EDIT_RESOURCE_VIEW_TYPE_KEY = "EDIT_RESOURCE_VIEW";

export class EditResourceView extends View {
	readonly plugin: DavesObsidianSystems;
	readonly noteForm: NoteForm;
	rerender: (id: string, element: ReactElement) => void;

	constructor(leaf: WorkspaceLeaf, plugin: DavesObsidianSystems, noteForm: NoteForm) {
		super(leaf);
		this.plugin = plugin;
		this.noteForm = noteForm;
		this.registerEvent(plugin.app.workspace.on('active-leaf-change', async (leaf: WorkspaceLeaf | null) => {
			this.onFileChange();
		}));
		this.registerEvent(plugin.app.workspace.on('editor-change', (editor: Editor, info: MarkdownView | MarkdownFileInfo) => this.onFileChange()));
		this.registerEvent(plugin.app.vault.on("modify", (file) => this.onFileChange()));
		this.registerEvent(plugin.app.vault.on("rename", (file) => this.onFileChange()));
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
		const tfile = this.app.workspace.getActiveFile();
		const id = tfile?.basename || "";
		const renderFn = this.rerender || ((id, child) => {
			this.rerender = renderMuiInShadowDom(id, this.containerEl, child);
		});

		if (tfile === null) {
			const child = React.createElement('div', null, "no active file")
			renderFn("none", child)
			return;
		}
		console.log("RERENDER EDIT RESOURCE VIEW", tfile);

		const path = (tfile.parent?.path || '') + '/';
		const componentFactory = Object.entries(this.noteForm)
			.filter(([notePath, _]) => notePath === path)
			.map(([_, noteFactory]) => noteFactory)
			.first();

		// const componentFactory = this.noteForm[path];
		if (!componentFactory) {
			const child = React.createElement('div', null, "no componentFactory for file")
			renderFn(id, child)
			return;
		}

		const child = await componentFactory(tfile.basename);
		renderFn(id, child);
	}
}
