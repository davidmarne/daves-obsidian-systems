import moment from "moment";
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import EatingManager from "src/systems/eating/managers/eating_manager";
import GtdManager from "src/systems/gtd/manager/gtd_manager";
import { Value, defaultValue } from "src/systems/gtd/resource_access/value";


export const getValueEditView = (gtdManager: GtdManager) => async (path?: string, onSubmit?: (value: Value) => void) => {
    const value = path !== undefined
        ? await gtdManager.readValue(path)
        : defaultValue();

    return <GenericForm
        defaultState={value}
        config={{
            directory: null,
            name: stringFormElement,
            why: multilineStringFormElement,
            description: multilineStringFormElement,

        }}
        onChange={async (value: Value) => {
            await gtdManager.writeValue(value);
            onSubmit && onSubmit(value);
        }} />;
}