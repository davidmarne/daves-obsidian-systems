import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import EatingManager from "src/systems/eating/managers/eating_manager";
import GtdManager from "src/systems/gtd/manager/gtd_manager";
import { Inbox } from "src/systems/gtd/resource_access/inbox";


export const getInboxEditView = (gtdManager: GtdManager) => async (path?: string, onSubmit?: (inspiration: Inbox) => void) => {
    const inbox = await gtdManager.readInbox();

    return <GenericForm
        defaultState={inbox}
        config={{
            directory: null,
            name: stringFormElement,
            // TODO: tasks
            tasks: null,
        }}
        onChange={async (inbox: Inbox) => {
            await gtdManager.writeInbox(inbox);
            onSubmit && onSubmit(inbox);
        }} />;
}