import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CreateResourceModal } from 'src/common/CreateResourceModal';
import { getComponentFactoryForFilePath } from 'src/common/EditResourceComponentFactory';
import { EditResourceModal } from 'src/common/EditResourceModal';
import { EDIT_RESOURCE_VIEW_TYPE_KEY, EditResourceView } from 'src/common/EditResourceView';
import { WhatToMakeModal } from 'src/systems/eating/components/what_to_make';
import { WhereToEatModal } from 'src/systems/eating/components/where_to_eat';
import { WhatToDoModal as WhatToDoEntertainment } from 'src/systems/entertainment/components/what_to_do'
import EatingManager from 'src/systems/eating/managers/eating_manager';
import EntertainmentManager from 'src/systems/entertainment/manager/entertainment_manager';
import { WhatToDoModal } from 'src/systems/music/components/what_to_do';
import MusicManager from 'src/systems/music/managers/music_manager';
import GtdManager from 'src/systems/gtd/manager/gtd_manager';
import { createObsidianResourceAccesses } from 'src/obsidian_client/obsidian_resource_access';
import { NoteFormComponentFactory, createNoteForm } from 'src/forms/note_forms';
import ExerciseManager from 'src/systems/exercise/manager/exercise_manager';

// Remember to rename these classes and interfaces!

interface DavesObsidianSystemsSettings {
	kitchenDirectory: string;
}

const DEFAULT_SETTINGS: DavesObsidianSystemsSettings = {
	kitchenDirectory: 'kitchen'
}


export default class DavesObsidianSystems extends Plugin {
	settings: DavesObsidianSystemsSettings;
	editResourceView: EditResourceView;

	async onload() {
		await this.loadSettings();
		const obsidianResourceAccesses = createObsidianResourceAccesses(this.app);
		
		const eatingManager = new EatingManager(
			obsidianResourceAccesses['eating/ingredient/'], 
			obsidianResourceAccesses['eating/recipe/'], 
			obsidianResourceAccesses['eating/restaurant/'], 
			obsidianResourceAccesses['eating/cuisine/']);


		const musicManager = new MusicManager(
			obsidianResourceAccesses['music/inspiration/'], 
			obsidianResourceAccesses['music/learning_resource/'], 
			obsidianResourceAccesses['music/lyric/'], 
			obsidianResourceAccesses['music/practice_exercise/'],
			obsidianResourceAccesses['music/project/']);


		const entertainmentManager = new EntertainmentManager(
			obsidianResourceAccesses['entertainment/entertainment_content/']);

		const gtdManager = new GtdManager(
			obsidianResourceAccesses['gtd/project/'],
			obsidianResourceAccesses['gtd/goal/'],
			obsidianResourceAccesses['gtd/value/'],
			obsidianResourceAccesses['gtd/inbox/']);

		const exerciseManager = new ExerciseManager(
			obsidianResourceAccesses['exercise/exercise/']);
	
		const noteForm = createNoteForm(
			eatingManager,
			entertainmentManager,
			gtdManager,
			exerciseManager,
		);
			
		this.registerView(EDIT_RESOURCE_VIEW_TYPE_KEY, (leaf) => {
			this.editResourceView = new EditResourceView(leaf, this, noteForm)
			return this.editResourceView;
		});


		const activateView = async () => {
			this.app.workspace.detachLeavesOfType(EDIT_RESOURCE_VIEW_TYPE_KEY);

			await this.app.workspace.getRightLeaf(false).setViewState({
				type: EDIT_RESOURCE_VIEW_TYPE_KEY,
				active: true,
			});

			this.app.workspace.revealLeaf(
				this.app.workspace.getLeavesOfType(EDIT_RESOURCE_VIEW_TYPE_KEY)[0]
			);
		}

		this.addCommand({
			id: `edit-resource-view`,
			name: `open edit resource view`,
			callback: () => {
				activateView();
			}
		})


		for (const [k, v] of Object.entries(noteForm)) {
			this.addCommand({
				id: `create-${k}-resource-modal`,
				name: `create ${k} resource`,
				callback: () => {
					new CreateResourceModal(this.app, v).open();
				}
			});
		}

		this.addCommand({
			id: `edit-resource-modal`,
			name: `edit resource`,
			checkCallback: (checking) => {
				const tfile = this.app.workspace.getActiveFile();
				if (tfile === null) {
					return false;
				}

				const path = (tfile.parent?.path || '') + '/';
				const componentFactory = Object.entries(noteForm)
					.filter(([notePath, _]) => notePath === path)
					.map(([_, noteFactory]) => noteFactory)
					.first()!;

				if (!componentFactory) {
					return false;
				}

				if (checking) {
					return true;
				}

				new EditResourceModal(this.app, componentFactory, tfile.basename).open();
			}
		});



		// generic create modal - needs function to render, listen to on submit to close self
		// generic edit modal - needs function to render, take init state, listen to on submit to close self
		// generic edit sidepanel - needs function to render, take init state
		
		// this.addCommand({
		// 	id: `eating-create-recipe-modal`,
		// 	name: `eating - create recipe`,
		// 	callback: () => {
		// 		new CreateRecipeModal(this.app, eatingManager).open();
		// 	}
		// });

		// this.addCommand({
		// 	id: `eating-create-restaurant`,
		// 	name: `eating - create restaurant`,
		// 	callback: () => {
		// 		new CreateRestaurantModal(this.app, eatingManager).open();
		// 	}
		// });

		this.addCommand({
			id: `eating-what-to-make-modal`,
			name: `eating - what to make?`,
			callback: () => {
				new WhatToMakeModal(this.app, eatingManager).open();
			}
		});

		this.addCommand({
			id: `eating-where-to-eat-modal`,
			name: `eating - where to eat?`,
			callback: () => {
				new WhereToEatModal(this.app, eatingManager).open();
			}
		});

		this.addCommand({
			id: `music-what-to-do`,
			name: `music - what to do?`,
			callback: () => {
				new WhatToDoModal(this.app, musicManager).open();
			}
		});
		
		// this.addCommand({
		// 	id: `music-create-inspiration`,
		// 	name: `music - create inspiration`,
		// 	callback: () => {
		// 		new CreateInspirationModal(this.app, musicManager).open();
		// 	}
		// });
		
		// this.addCommand({
		// 	id: `music-create-practice-exercise`,
		// 	name: `music - create practice exercise`,
		// 	callback: () => {
		// 		new CreatePracticeExerciseModal(this.app, musicManager).open();
		// 	}
		// });

		// this.addCommand({
		// 	id: `music-create-learning-resource`,
		// 	name: `music - create learning resource`,
		// 	callback: () => {
		// 		new CreateLearningResourceModal(this.app, musicManager).open();
		// 	}
		// });

		this.addCommand({
			id: `entertainment-what-to-do`,
			name: `entertainment - what to do?`,
			callback: () => {
				new WhatToDoEntertainment(this.app, entertainmentManager).open();
			}
		});
		
		// this.addCommand({
		// 	id: `entertainment-create-entertainement-content`,
		// 	name: `entertainment - create entertainement content`,
		// 	callback: () => {
		// 		new CreateEntertainmentContentModal(this.app, entertainmentManager).open();
		// 	}
		// });
		this.addSettingTab(new KitchenSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class KitchenSettingTab extends PluginSettingTab {
	plugin: DavesObsidianSystems;

	constructor(app: App, plugin: DavesObsidianSystems) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('directory')
			.setDesc('directory to save kitchen notes')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.kitchenDirectory)
				.setValue(this.plugin.settings.kitchenDirectory)
				.onChange(async (value) => {
					this.plugin.settings.kitchenDirectory = value;
					await this.plugin.saveSettings();
				}));
	}
}
