import { EntertainmentContent } from "../resource_access/entertainment_content/entertainment_content";
import EntertainmentContentResourceAccess from "../resource_access/entertainment_content/entertainment_content_resource_access";

export default class EatingManager {
    readonly entertainmentContentResourceAccess: EntertainmentContentResourceAccess;

    constructor(entertainmentContentResourceAccess: EntertainmentContentResourceAccess) {
        this.entertainmentContentResourceAccess = entertainmentContentResourceAccess;
    }

    async createEntertainmentContent(newEntertainmentContent: EntertainmentContent): Promise<void> {
        await this.entertainmentContentResourceAccess.writeResource(newEntertainmentContent);
    }

    async readAllEntertainmentContent() {
        return await this.entertainmentContentResourceAccess.readAll();
    }
}