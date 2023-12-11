import { Root } from "mdast";
import { App, TFile, TFolder, normalizePath } from "obsidian";
import { getMDAST, getMarkdownContentFromAST } from "src/common/ast";
import { Note } from "./note";


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

    async list(): Promise<T[]> {
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

    async readResourceByPath(path: string): Promise<T> {
        const ast = await this.readASTByPath(path);
        const fileName = this.nameFromPath(path);
        return this.fromAst(fileName, ast);
    }

    async writeResource(resource: T): Promise<TFile> {
        const path = resource.path()
        const ast = this.toAst(resource);
        return this.writeAstByPath(path, ast);
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

    protected abstract fromAst(name: string, ast: Root): T;

    protected abstract toAst(resource: T): Root;
}

/**
 * v2
 * 

enum ResourceAccessEventTypes {
    CREATE,
    UPDATE,
    DELETE
}

interface CreateAccessEvent<T extends Note> {
    type: ResourceAccessEventTypes.CREATE,
    value: T,
}

interface UpdateAccessEvent<T extends Note> {
    type: ResourceAccessEventTypes.UPDATE,
    previousValue: T,
    nextValue: T,
}
interface DeleteAccessEvent<T extends Note> {
    type: ResourceAccessEventTypes.DELETE,
    previousValue: T,
}

type ResourceAccessEvent<T extends Note> = CreateAccessEvent<T> | UpdateAccessEvent<T> | DeleteAccessEvent<T>;

abstract class IResourceAccess<T extends Note> {
    abstract list(): Promise<T[]>;
    abstract read(name: string): Promise<T>;
    abstract exists(name: string): boolean;
    abstract write(note: T): Promise<void>;
    abstract delete(name: string): Promise<void>;
    // TODO: this should prob be on manager?
    abstract onChange(callback: (event: ResourceAccessEvent<T>) => void): () => void;
}

class CachingResourceAccess<T extends Note> extends IResourceAccess<T> {
    inner: IResourceAccess<T>;

    constructor(inner: IResourceAccess<T>) {
        super();
        this.inner = inner;
        inner.onChange((event) => {
            switch (event.type) {
                case ResourceAccessEventTypes.CREATE:

                case ResourceAccessEventTypes.UPDATE:
                case ResourceAccessEventTypes.DELETE:
            }
        })
    }

    // list(): Promise<T[]> => list
    // read(name: string): Promise<T> => read
    exists(name: string) {
        return this.inner.exists(name);
    }
    write(note: T): Promise<void> {
        return this.inner.write(note);
    }
    delete(name: string): Promise<void> {
        return this.inner.delete(name);
    }
    onChange(callback: (note: T | undefined) => void) {
        return this.inner.onChange(callback);
    }
}

abstract class MarkdownSerializer<T extends Note> {
    abstract fromAst(name: string, ast: Root): T;
    abstract toAst(resource: T): Root;
}
 */