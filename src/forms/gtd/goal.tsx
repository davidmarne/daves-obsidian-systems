import moment from "moment";
import { GenericForm, dateColumn, multiSelectFormElement, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from "src/common/generic_forms";
import * as React from 'react';
import EatingManager from "src/systems/eating/managers/eating_manager";
import GtdManager from "src/systems/gtd/manager/gtd_manager";
import { Goal, defaultGoal } from "src/systems/gtd/resource_access/goal";


export const getGoalEditView = (gtdManager: GtdManager) => async (path?: string, onSubmit?: (goal: Goal) => void) => {
    const goal = path !== undefined
        ? await gtdManager.readGoal(path)
        : defaultGoal();

    const values = await gtdManager.listValues();

    return <GenericForm
        defaultState={goal}
        config={{
            directory: null,
            name: stringFormElement,
            why: multilineStringFormElement,
            description: multilineStringFormElement,
            values: multiSelectFormElement(values.map(it => it.name)),

        }}
        onChange={async (goal: Goal) => {
            await gtdManager.writeGoal(goal);
            onSubmit && onSubmit(goal);
        }} />;
}