import { App, TFile, normalizePath } from "obsidian";
import { SerializerBuilder, path } from "src/common/mdast_serializer";
import { Note, NoteKinds } from "src/common/note";
import { IResourceAccess } from "src/common/resource_access";
import { cuisineSerializer } from "./serder/eating/cuisineSerializer";
import { ingredientSerializer } from "./serder/eating/ingredientSerializer";
import { Root } from "mdast";
import { getMDAST, getMarkdownContentFromAST } from "src/common/ast";
import { recipeSerializer } from "./serder/eating/recipeSerializer";
import { restaurantSerializer } from "./serder/eating/restaurantSerializer";
import { entertainmentSerializer } from "./serder/entertainment/entertainmentSerializer";
import { projectSerializer } from "./serder/gtd/projectSerializer";
import { valueSerializer } from "./serder/gtd/valueSerializer";
import { goalSerializer } from "./serder/gtd/goalSerializer";
import { inboxSerializer } from "./serder/gtd/inboxSerializer";
import { exerciseSerializer } from "./serder/exercise/exerciseSerializer";
import { musicProjectSerializer } from "./serder/music/projectSerializer";
import { inspirationSerializer } from "./serder/music/inspirationSerializer";
import { lyricSerializer } from "./serder/music/lyricSerializer";
import { practiceExerciseSerializer } from "./serder/music/practiceExerciseSerializer";
import { learningResourceSerializer } from "./serder/music/learningResourceSerializer";

// eforces there is a resource access for every notekind
export type ObsidianResourceAccesses = {
    [E in NoteKinds as E["directory"]]: ObsidianResourceAccess<E>;
}

export const createObsidianResourceAccesses: (app: App) => ObsidianResourceAccesses = (app: App) => ({
    'eating/cuisine/': new ObsidianResourceAccess(app, 'eating/cuisine/', cuisineSerializer),
    'eating/ingredient/': new ObsidianResourceAccess(app, 'eating/ingredient/', ingredientSerializer),
    'eating/recipe/': new ObsidianResourceAccess(app, 'eating/recipe/', recipeSerializer),
    'eating/restaurant/': new ObsidianResourceAccess(app, 'eating/restaurant/', restaurantSerializer),
    'entertainment/entertainment_content/': new ObsidianResourceAccess(app, 'entertainment/entertainment_content/', entertainmentSerializer),
    'gtd/project/': new ObsidianResourceAccess(app, 'gtd/project/', projectSerializer),
    'gtd/inbox/': new ObsidianResourceAccess(app, 'gtd/inbox/', inboxSerializer),
    'gtd/value/': new ObsidianResourceAccess(app, 'gtd/value/', valueSerializer),
    'gtd/goal/': new ObsidianResourceAccess(app, 'gtd/goal/', goalSerializer),
    'exercise/exercise/': new ObsidianResourceAccess(app, 'eating/exercise/', exerciseSerializer),
    'music/project/': new ObsidianResourceAccess(app, 'music/project/', musicProjectSerializer),
    'music/inspiration/': new ObsidianResourceAccess(app, 'music/inspiration/', inspirationSerializer),
    'music/lyric/': new ObsidianResourceAccess(app, 'music/lyric/', lyricSerializer),
    'music/practice_exercise/': new ObsidianResourceAccess(app, 'music/practice_exercise/', practiceExerciseSerializer),
    'music/learning_resource/': new ObsidianResourceAccess(app, 'music/learning_resource/', learningResourceSerializer),
});

export class ObsidianResourceAccess<T extends Note> implements IResourceAccess<T>{
    private readonly app: App;
    private readonly directory: string;
    private readonly serializer: SerializerBuilder<T>;

    constructor(app: App, directory: string, serializer: SerializerBuilder<T>) {
        this.app = app;
        this.directory = directory;
        this.serializer = serializer;

        // create directory if it does not exist
        this.app.vault.adapter
            .exists(normalizePath(directory))
            .then(exists => {
                if (!exists) {
                    this.app.vault.createFolder(directory);
                }
            });
    }

    async list(): Promise<T[]> {
        console.log("RA list", this.directory)
        return Promise.all(this.app.vault.getMarkdownFiles()
            .filter(it => it.path.startsWith(this.directory))
            .map(it => this.read(it.basename)));
    }

    exists(name: string): boolean {
        const path = this.nameToPath(name);
        console.log("RA exists", name, path)
        return this.app.vault.getMarkdownFiles()
            .filter(it => it.path === path)
            .length > 0
    }

    async read(name: string): Promise<T> {
        const path = this.nameToPath(name);
        console.log("RA read", name, path)
        const ast = await this.readASTByPath(path);
        const fileName = this.nameFromPath(path);
        return this.fromAst(fileName, ast);
    }

    async write(resource: T): Promise<void> {
        const p = path(this.directory, resource.name)
        console.log("RA read", resource.name, p)
        const ast = this.toAst(resource);
        await this.writeAstByPath(p, ast);
    }

    async delete(name: string): Promise<void> {
        const path = this.nameToPath(name);
        console.log("RA delete", name, path)
        const tfile = this.app.vault.getAbstractFileByPath(path);
        if (tfile != null) {
            return await this.app.vault.delete(tfile);
        }
        throw new Error('file not found');
    }

    private async readASTByPath(path: string): Promise<Root> {
        const file = this.app.vault.getAbstractFileByPath(path)
        if (file instanceof TFile){
            return this.fileToAst(file);
        }
        throw new Error('file not found');
    }

    private async writeAstByPath(path: string, ast: Root): Promise<TFile> {
        const tfile = this.app.vault.getAbstractFileByPath(path);
        if (tfile instanceof TFile){
            const content = getMarkdownContentFromAST(ast);
            await this.app.vault.modify(tfile, content);
            return tfile;
        } else if (tfile === null) {
            const content = getMarkdownContentFromAST(ast);
            return await this.app.vault.create(path, content);
        } else {
            throw new Error('file not found');
        }
    }

    private async fileToAst(file: TFile): Promise<Root> {
        return getMDAST(this.app.vault, file);
    }

    private nameToPath(name: string): string {
        return `${this.directory}${name}.md`
    }

    private nameFromPath(path: string): string {
        const parts = path.split('/');
        return parts[parts.length - 1].replace('.md', '');
    }

    private fromAst(name: string, ast: Root): T {
        return this.serializer.deserialize(ast, {
            name: name,
            directory: this.directory,
        } as Partial<T>);
    }

    private toAst(resource: T): Root {
        return this.serializer.serialize(resource);
    }
}