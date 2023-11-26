import { Root } from "mdast";
import { App, TFile, TFolder, normalizePath } from "obsidian";
import { getMDAST, getMarkdownContentFromAST } from "src/common/ast";
import { Note } from "./note";
import { dir } from "console";

export default abstract class ResourceAccess<T extends Note> {
    private readonly app: App;
    private readonly directory: string;

    constructor(app: App, directory: string) {
        this.app = app;
        this.directory = directory;

        // create directory if it does not exist
        this.app.vault.adapter
            .exists(normalizePath(directory))
            .then(exists => {
                if (!exists) {
                    this.app.vault.createFolder(directory);
                }
            });
    }

    async readAll(): Promise<T[]> {
        return Promise.all(this.app.vault.getMarkdownFiles()
            .filter(it => it.path.startsWith(this.directory))
            .map(it => this.readResourceByPath(it.path)));
    }

    exists(name: string): boolean {
        const path = this.nameToPath(name);
        return this.app.vault.getMarkdownFiles()
            .filter(it => it.path === path)
            .length > 0
    }

    async readResourceByName(name: string): Promise<T> {
        const path = this.nameToPath(name);
        return this.readResourceByPath(path);
    }

    async readResourceByPath(path: string): Promise<T> {
        const ast = await this.readASTByPath(path);
        const fileName = this.nameFromPath(path);
        return this.fromAst(fileName, ast);
    }

    async readASTByName(name: string): Promise<Root> {
        const path = this.nameToPath(name);
        return this.readASTByPath(path);
    }

    async readASTByPath(path: string): Promise<Root> {
        const file = this.app.vault.getAbstractFileByPath(path)
        if (file instanceof TFile){
            return this.fileToAst(file);
        }
        throw new Error('file not found');
    }

    async writeResource(resource: T): Promise<TFile> {
        const path = resource.path()
        const ast = this.toAst(resource);
        return this.writeAstByPath(path, ast);
    }

    async writeAstByPath(path: string, ast: Root): Promise<TFile> {
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

    protected abstract fromAst(name: string, ast: Root): T;

    protected abstract toAst(resource: T): Root;
}
