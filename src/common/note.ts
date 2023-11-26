export abstract class Note {
    readonly name: string;
    readonly directory: string;

    constructor(name: string, directory: string) {
        this.name = name;
        this.directory = directory;
    }

    path() {
        return `${this.directory}${this.name}.md`
    }

    link() {
        return `[[${this.path()}|${this.name}]]`
    }

    // wiki links in markdown get messed up due to the | (which is a cell separator in tables)
    // obsidian works around this by escaping the |
    // TODO: just use markdown style links instead of wiki links?
    tableLink() {
        return `[[${this.path()}\\|${this.name}]]`
    }
}