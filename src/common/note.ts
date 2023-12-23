import { Cuisine } from "src/systems/eating/resource_access/cuisine";
import { Ingredient } from "src/systems/eating/resource_access/ingredient";
import { Recipe } from "src/systems/eating/resource_access/recipe";
import { Restaurant } from "src/systems/eating/resource_access/restaurant";
import { EntertainmentContent } from "src/systems/entertainment/resource_access/entertainment_content";
import { Exercise } from "src/systems/exercise/resource_access/exercise";
import { Goal } from "src/systems/gtd/resource_access/goal";
import { Inbox } from "src/systems/gtd/resource_access/inbox";
import { Project } from "src/systems/gtd/resource_access/project";
import { Value } from "src/systems/gtd/resource_access/value";
import { Inspiration } from "src/systems/music/resource_access/inspiration";
import { LearningResource } from "src/systems/music/resource_access/learning_resource";
import { Lyric } from "src/systems/music/resource_access/lyric";
import { PracticeExercise } from "src/systems/music/resource_access/practice_exercise";
import { MusicProject } from "src/systems/music/resource_access/project";

export type NoteKinds = 
    Cuisine | 
    Ingredient |
    Recipe |
    Restaurant |
    EntertainmentContent |
    Project |
    Goal | 
    Inbox |
    Value |
    Exercise | 
    Inspiration | 
    LearningResource |
    Lyric |
    Project |
    PracticeExercise |
    MusicProject;
 
export interface Note {
    readonly name: string;
    readonly directory: string;
}
