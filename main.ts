import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CreateRecipeModal } from 'src/eating/components/create_recipe';
import { CreateRestaurantModal } from 'src/eating/components/create_restaurant';
import { WhatToMakeModal } from 'src/eating/components/what_to_make';
import EatingManager from 'src/eating/managers/eating_manager';
import CuisineResourceAccess from 'src/eating/resource_access/cuisine/cuisine_resource_access';
import IngredientResourceAccess from 'src/eating/resource_access/ingredient/ingredient_resource_access';
import RecipeResourceAccess from 'src/eating/resource_access/recipe/recipe_resource_access';
import RestaurantResourceAccess from 'src/eating/resource_access/restaurant/restaurant_resource_access';
import { WhatToDoModal } from 'src/music/components/what_to_do';
import MusicManager from 'src/music/managers/music_manager';
import InspirationResourceAccess from 'src/music/resource_access/inspiration/inspiration_resource_access';
import LearningResourceResourceAccess from 'src/music/resource_access/learning_resource/learning_resource_resource_access';
import LyricResourceAccess from 'src/music/resource_access/lyric/lyric_resource_access';
import PracticeExerciseResourceAccess from 'src/music/resource_access/practice_exercise/practice_exercise_resource_access';
import ProjectResourceAccess from 'src/music/resource_access/project/project_resource_access';

// Remember to rename these classes and interfaces!

interface KitchenPluginSettings {
	kitchenDirectory: string;
}

const DEFAULT_SETTINGS: KitchenPluginSettings = {
	kitchenDirectory: 'kitchen'
}

export default class KitchenPlugin extends Plugin {
	settings: KitchenPluginSettings;

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
		
		this.addCommand({
			id: `kitchen-create-recipe-modal`,
			name: `kitchen - create recipe`,
			callback: () => {
				new CreateRecipeModal(this.app, eatingManager).open();
			}
		});

		this.addCommand({
			id: `kitchen-create-restaurant`,
			name: `kitchen - create restaurant`,
			callback: () => {
				new CreateRestaurantModal(this.app, eatingManager).open();
			}
		});

		this.addCommand({
			id: `kitchen-what-to-make-modal`,
			name: `kitchen - what to make?`,
			callback: () => {
				new WhatToMakeModal(this.app, eatingManager).open();
			}
		});

		this.addCommand({
			id: `music-what-to-do`,
			name: `music - what to do?`,
			callback: () => {
				new WhatToDoModal(this.app, musicManager).open();
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
	plugin: KitchenPlugin;

	constructor(app: App, plugin: KitchenPlugin) {
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
