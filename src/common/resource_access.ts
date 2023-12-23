import { Root } from "mdast";
import { App, TFile, TFolder, normalizePath } from "obsidian";
import { getMDAST, getMarkdownContentFromAST } from "src/common/ast";
import { Note } from "./note";
import { SerializerBuilder } from "./mdast_serializer";

export interface IResourceAccess<T extends Note> {
    list(): Promise<T[]>;
    read(name: string): Promise<T>;
    exists(name: string): boolean;
    write(note: T): Promise<void>;
    delete(name: string): Promise<void>;
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