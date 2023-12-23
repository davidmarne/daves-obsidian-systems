import { JSXElementConstructor, ReactElement } from "react";
import { Note, NoteKinds } from "src/common/note";
import { Cuisine } from 'src/systems/eating/resource_access/cuisine';
import { Ingredient } from 'src/systems/eating/resource_access/ingredient';
import { Recipe } from 'src/systems/eating/resource_access/recipe';
import { Restaurant } from 'src/systems/eating/resource_access/restaurant';
import { EntertainmentContent } from 'src/systems/entertainment/resource_access/entertainment_content';
import { Exercise } from 'src/systems/exercise/resource_access/exercise';
import { Goal } from 'src/systems/gtd/resource_access/goal';
import { Inbox } from 'src/systems/gtd/resource_access/inbox';
import { Project } from 'src/systems/gtd/resource_access/project';
import { Value } from 'src/systems/gtd/resource_access/value';
import { Inspiration } from 'src/systems/music/resource_access/inspiration';
import { LearningResource } from 'src/systems/music/resource_access/learning_resource';
import { Lyric } from 'src/systems/music/resource_access/lyric';
import { PracticeExercise } from 'src/systems/music/resource_access/practice_exercise';
import { getRestaurantEditView } from "./eating/restaurant";
import { getCuisineEditView } from "./eating/cuisine";
import EatingManager from "src/systems/eating/managers/eating_manager";
import { getIngredientEditView } from "./eating/ingredient";
import { getRecipeEditView } from "./eating/recipe";
import { getEntertainmentContentEditView } from "src/systems/entertainment/components/create_entertainment_content";
import EntertainmentManager from "src/systems/entertainment/manager/entertainment_manager";
import { getProjectEditView } from "./gtd/project";
import { getInboxEditView } from "./gtd/inbox";
import { getValueEditView } from "./gtd/value";
import { getGoalEditView } from "./gtd/goal";
import GtdManager from "src/systems/gtd/manager/gtd_manager";
import { getExerciseEditView } from "./exercise/exercise";
import ExerciseManager from "src/systems/exercise/manager/exercise_manager";
import MusicManager from "src/systems/music/managers/music_manager";
import { getLyricEditView } from "./music/lyric";
import { getInspirationEditView } from "./music/inspiration";
import { getMusicProjectEditView } from "./music/project";
import { getPracticeExerciseEditView } from "./music/practice_exercise";
import { getLearningResourceEditView } from "./music/learning_resource";


export type NoteFormComponentFactory<T extends Note> = (name?: string, onSubmit?: (value: T) => void) => Promise<ReactElement>;

export type NoteForm = {
    [E in NoteKinds as E["directory"]]: NoteFormComponentFactory<E>;
}

export const createNoteForm = (
    eatingManager: EatingManager,
    entertainmentManager: EntertainmentManager,
    gtdManager: GtdManager,
    exerciseManager: ExerciseManager,
    musicManager: MusicManager) => ({
        'eating/cuisine/': getCuisineEditView(eatingManager),
        'eating/ingredient/': getIngredientEditView(eatingManager),
        'eating/recipe/': getRecipeEditView(eatingManager),
        'eating/restaurant/': getRestaurantEditView(eatingManager),
        'entertainment/entertainment_content/': getEntertainmentContentEditView(entertainmentManager),
        'gtd/project/': getProjectEditView(gtdManager),
        'gtd/inbox/': getInboxEditView(gtdManager),
        'gtd/value/': getValueEditView(gtdManager),
        'gtd/goal/': getGoalEditView(gtdManager),
        'exercise/exercise/': getExerciseEditView(exerciseManager),
        'music/project/': getMusicProjectEditView(musicManager),
        'music/inspiration/': getInspirationEditView(musicManager),
        'music/lyric/': getLyricEditView(musicManager),
        'music/practice_exercise/': getPracticeExerciseEditView(musicManager),
        'music/learning_resource/': getLearningResourceEditView(musicManager),
    });