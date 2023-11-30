import { App, Modal } from 'obsidian';
import * as React from 'react';
import { CreateLearningResourceForm } from "./internal/CreateLearningResourceForm";
import MusicManager from '../managers/music_manager';
import { getUrlStringFromClipboard } from 'src/common/url_util';
import { LearningResource } from '../resource_access/learning_resource/learning_resource';


export const getLearningResourceEditView = (app: App, musicManager: MusicManager)  => async (path?: string, onSubmit?: (learningResource: LearningResource) => void) => {
    const defaultLearningResource = path !== undefined 
        ? await musicManager.readLearningResource(path) 
        : undefined;

    const defaultSource = await getUrlStringFromClipboard();
    return <CreateLearningResourceForm
        defaultLearningResource={defaultLearningResource}
        defaultSource={defaultSource}
        handleSubmit={async (learningResource) => {
            const tfile = await musicManager.createLearningResource(learningResource);
            app.workspace.getLeaf(false).openFile(tfile);
            close();
        }} />;
}