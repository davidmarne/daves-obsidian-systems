import { TFile } from "obsidian";
import { EntertainmentContent } from "../resource_access/entertainment_content/entertainment_content";
import EntertainmentContentResourceAccess from "../resource_access/entertainment_content/entertainment_content_resource_access";

export default class EntertainmentManager {
    readonly entertainmentContentResourceAccess: EntertainmentContentResourceAccess;

    constructor(entertainmentContentResourceAccess: EntertainmentContentResourceAccess) {
        this.entertainmentContentResourceAccess = entertainmentContentResourceAccess;
    }

    async createEntertainmentContent(newEntertainmentContent: EntertainmentContent): Promise<TFile> {
       return await this.entertainmentContentResourceAccess.writeResource(newEntertainmentContent);
    }

    async readAllEntertainmentContent() {
        return await this.entertainmentContentResourceAccess.readAll();
    }
}