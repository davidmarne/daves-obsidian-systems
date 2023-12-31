import { App, Modal } from 'obsidian';
import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import { CreateEntertainmentContentForm } from "./internal/CreateEntertainmentContentForm";
import { getUrlStringFromClipboard } from 'src/common/url_util';
import EntertainmentManager from '../manager/entertainment_manager';
import { EntertainmentContent } from '../resource_access/entertainment_content';

export const getEntertainmentContentEditView = (manager: EntertainmentManager) => async (path?: string, onSubmit?: (entertainmentContent: EntertainmentContent) => void) => {
    const defaultEntertainmentContent = path !== undefined 
        ? await manager.readEntertainmentContent(path) 
        : undefined;

    return <CreateEntertainmentContentForm
        defaultEntertainmentContent={defaultEntertainmentContent}
        handleSubmit={async (entertainmentContent) => {
            await manager.writeEntertainmentContent(entertainmentContent);
            onSubmit && onSubmit(entertainmentContent);
        }} />
}