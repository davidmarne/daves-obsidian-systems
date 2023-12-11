import * as React from 'react';
import { Recipe, RecipeLog } from 'src/eating/resource_access/recipe/recipe';
import { PartialUpdater, withPartial } from 'src/common/react_util';
import Example from '../Datatable';
import { MRT_ColumnDef } from 'material-react-table';
import moment from 'moment';

const defaultLog = (): RecipeLog => {
  return {
    date: moment(),
    rating: 0,
    notes: '',
  }
}

export const SetRecipeLogForm = (props: {
  recipeState: Recipe;
  setRecipeState: PartialUpdater<Recipe>;
}) => {
  const { recipeState, setRecipeState } = props;

  const handleLogChanged = ((change: { prev: RecipeLog; next: RecipeLog; }) => {
    const nextUsages = props.recipeState.log
      .map(item => item == change.prev ? change.next : item);

    setRecipeState({
      log: nextUsages
    });
  });

  const handleLogCreated = ((created: RecipeLog) => {
    const nextUsages = [created, ...props.recipeState.log];
    setRecipeState({
      log: nextUsages
    });
  });

  const handleLogDeleted = ((deleted: RecipeLog) => {
    const nextUsages = props.recipeState.log.filter(it => it != deleted);
    setRecipeState({
      log: nextUsages
    });
  });

  const logColumns = logcolumns(
    handleLogChanged
  );

  return <Example
    columns={logColumns}
    items={recipeState.log}
    onCreate={handleLogCreated}
    onDelete={handleLogDeleted}
    getRowId={(log) => JSON.stringify(log)}
    defaultVaue={() => defaultLog()} />;
};

const logcolumns = (onChange: (change: { prev: RecipeLog; next: RecipeLog; }) => void): MRT_ColumnDef<RecipeLog>[] => [
  {
    accessorFn: (it) => it.date.format("gggg-MM-DD"),
    header: 'Date',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'date',
      required: true,
      onChange: (event) => {
        console.log("DATE CHANGE", event.target.value, moment(event.target.value, 'gggg-MM-DD'));
        const next = withPartial(row.original, {
          date: moment(event.target.value, 'gggg-MM-DD')
        });
        onChange({ prev: row.original, next: next });
      },
    })
  },
  {
    accessorFn: (it) => it.rating,
    header: 'Rating',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'number',
      required: true,
      onChange: (event) => {
        const next = withPartial(row.original, {
          rating: +event.target.value
        });
        onChange({ prev: row.original, next: next });
      },
    }),
  },
  {
    accessorFn: (it) => it.notes,
    header: 'Notes',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'text',
      required: true,
      onChange: (event) => {
        const next = withPartial(row.original, {
          notes: event.target.value
        });
        onChange({ prev: row.original, next: next });
      },
    }),
  },
];