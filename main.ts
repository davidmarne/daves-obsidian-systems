import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CreateRecipeModal } from 'src/eating/components/create_recipe';
import { CreateRestaurantModal } from 'src/eating/components/create_restaurant';
import { WhatToMakeModal } from 'src/eating/components/what_to_make';
import { WhereToEatModal } from 'src/eating/components/where_to_eat';
import EatingManager from 'src/eating/managers/eating_manager';
import CuisineResourceAccess from 'src/eating/resource_access/cuisine/cuisine_resource_access';
import IngredientResourceAccess from 'src/eating/resource_access/ingredient/ingredient_resource_access';
import RecipeResourceAccess from 'src/eating/resource_access/recipe/recipe_resource_access';
import RestaurantResourceAccess from 'src/eating/resource_access/restaurant/restaurant_resource_access';
import { CreateEntertainmentContentModal } from 'src/entertainment/components/create_entertainment_content';
import EntertainmentManager from 'src/entertainment/manager/entertainment_manager';
import EntertainmentContentResourceAccess from 'src/entertainment/resource_access/entertainment_content/entertainment_content_resource_access';
import { CreateInspirationModal } from 'src/music/components/create_inspiration';
import { CreateLearningResourceModal } from 'src/music/components/create_learning_resource';
import { CreatePracticeExerciseModal } from 'src/music/components/create_practice_exercise';
import { WhatToDoModal } from 'src/music/components/what_to_do';
import { WhatToDoModal as WhatToDoEntertainment } from 'src/entertainment/components/what_to_do';
import MusicManager from 'src/music/managers/music_manager';
import InspirationResourceAccess from 'src/music/resource_access/inspiration/inspiration_resource_access';
import LearningResourceResourceAccess from 'src/music/resource_access/learning_resource/learning_resource_resource_access';
import LyricResourceAccess from 'src/music/resource_access/lyric/lyric_resource_access';
import PracticeExerciseResourceAccess from 'src/music/resource_access/practice_exercise/practice_exercise_resource_access';
import ProjectResourceAccess from 'src/music/resource_access/project/project_resource_access';

// Remember to rename these classes and interfaces!

interface DavesObsidianSystemsSettings {
	kitchenDirectory: string;
}

const DEFAULT_SETTINGS: DavesObsidianSystemsSettings = {
	kitchenDirectory: 'kitchen'
}

export default class DavesObsidianSystems extends Plugin {
	settings: DavesObsidianSystemsSettings;

	async onload() {
		await this.loadSettings();
		const ingredientResourceAccess = new IngredientResourceAccess(this.app);
        const recipeResourceAccess = new RecipeResourceAccess(this.app);
        const restaurantResourceAccess = new RestaurantResourceAccess(this.app);
        const cuisineResourceAccess = new CuisineResourceAccess(this.app);
		const eatingManager = new EatingManager(
			ingredientResourceAccess, 
			recipeResourceAccess, 
			restaurantResourceAccess,
			cuisineResourceAccess);


		const inspirationResourceAccess = new InspirationResourceAccess(this.app);
        const learningResourceAccess = new LearningResourceResourceAccess(this.app);
        const lyricResourceAccess = new LyricResourceAccess(this.app);
        const practiceResourceAccess = new PracticeExerciseResourceAccess(this.app);
        const projectResourceAccess = new ProjectResourceAccess(this.app);
		const musicManager = new MusicManager(
			inspirationResourceAccess, 
			learningResourceAccess, 
			lyricResourceAccess,
			practiceResourceAccess,
			projectResourceAccess);

		const entertainmentContentResourceAccess = new EntertainmentContentResourceAccess(this.app);
		const entertainmentManager = new EntertainmentManager(
			entertainmentContentResourceAccess);
		
		this.addCommand({
			id: `eating-create-recipe-modal`,
			name: `eating - create recipe`,
			callback: () => {
				new CreateRecipeModal(this.app, eatingManager).open();
			}
		});

		this.addCommand({
			id: `eating-create-restaurant`,
			name: `eating - create restaurant`,
			callback: () => {
				new CreateRestaurantModal(this.app, eatingManager).open();
			}
		});

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
		
		this.addCommand({
			id: `music-create-inspiration`,
			name: `music - create inspiration`,
			callback: () => {
				new CreateInspirationModal(this.app, musicManager).open();
			}
		});
		
		this.addCommand({
			id: `music-create-practice-exercise`,
			name: `music - create practice exercise`,
			callback: () => {
				new CreatePracticeExerciseModal(this.app, musicManager).open();
			}
		});

		this.addCommand({
			id: `music-create-learning-resource`,
			name: `music - create learning resource`,
			callback: () => {
				new CreateLearningResourceModal(this.app, musicManager).open();
			}
		});

		this.addCommand({
			id: `entertainment-what-to-do`,
			name: `entertainment - what to do?`,
			callback: () => {
				new WhatToDoEntertainment(this.app, entertainmentManager).open();
			}
		});
		
		this.addCommand({
			id: `entertainment-create-entertainement-content`,
			name: `entertainment - create entertainement content`,
			callback: () => {
				new CreateEntertainmentContentModal(this.app, entertainmentManager).open();
			}
		});
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
