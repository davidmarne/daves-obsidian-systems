import { TFile } from "obsidian";
import { EntertainmentContent } from "../resource_access/entertainment_content";
import { IResourceAccess } from "src/common/resource_access";

export default class EntertainmentManager {
    readonly entertainmentContentResourceAccess: IResourceAccess<EntertainmentContent>;

    constructor(entertainmentContentResourceAccess: IResourceAccess<EntertainmentContent>) {
        this.entertainmentContentResourceAccess = entertainmentContentResourceAccess;
    }

    async writeEntertainmentContent(newEntertainmentContent: EntertainmentContent): Promise<void> {
    await this.entertainmentContentResourceAccess.write(newEntertainmentContent);
    }

    async listEntertainmentContent() {
        return await this.entertainmentContentResourceAccess.list();
    }

    async readEntertainmentContent(name: string) {
        return this.entertainmentContentResourceAccess.read(name);
    }
}