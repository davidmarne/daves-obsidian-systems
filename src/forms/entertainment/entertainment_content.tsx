import { App, Modal } from 'obsidian';
import * as React from 'react';
import { renderMuiInShadowDom } from "src/common/Shadow";
import { GenericForm, multilineStringFormElement, numberFormElement, selectFormElement, stringFormElement } from 'src/common/generic_forms';

import { getUrlStringFromClipboard } from 'src/common/url_util';
import EntertainmentManager from 'src/systems/entertainment/manager/entertainment_manager';
import { EntertainmentContent, EntertainmentContentKinds, defaultEntertainmentContent } from 'src/systems/entertainment/resource_access/entertainment_content';
import { defaultExercise } from 'src/systems/exercise/resource_access/exercise';

export const getEntertainmentContentEditView = (manager: EntertainmentManager) => async (path?: string, onSubmit?: (entertainmentContent: EntertainmentContent) => void) => {
    const existing = path !== undefined 
        ? await manager.readEntertainmentContent(path) 
        : undefined;

    return <GenericForm
        defaultState={existing || defaultEntertainmentContent()}
        config={{
            directory: null,
            name: stringFormElement,
            kind: null,
            state: null,
            anticipation: null,
            rating: numberFormElement,
            description: multilineStringFormElement,
            // TODO: kind
            // kind: selectFormElement(EntertainmentContentKinds),
        }}
        onChange={async (entertainmentContent: EntertainmentContent) => {
            await manager.writeEntertainmentContent(entertainmentContent);
            onSubmit && onSubmit(entertainmentContent);
        }} />;
}