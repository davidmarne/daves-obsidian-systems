import * as React from 'react';
import { Restaurant, RestaurantLog } from 'src/eating/resource_access/restaurant/restaurant';
import { PartialUpdater, useStateWithPartialUpdater, withPartial } from 'src/common/react_util';
import Example from '../Datatable';
import { MRT_ColumnDef } from 'material-react-table';
import moment, { Moment } from 'moment';
import { Note } from 'src/common/note';

const defaultLog = (): RestaurantLog => {
  return {
    date: moment(),
    dish: '',
    rating: 0,
    notes: '',
  }
}

export const SetRestaurantLogForm = (props: {
  restaurantState: Restaurant;
  setRestaurantState: PartialUpdater<Restaurant>;
}) => {
  const { restaurantState, setRestaurantState } = props;

  const handleLogChanged = ((change: { prev: RestaurantLog; next: RestaurantLog; }) => {
    const nextLog = props.restaurantState.log
      .map(item => item == change.prev ? change.next : item);
console.log("NEX LOG", nextLog)
    setRestaurantState({
      log: nextLog
    });
  });

  const handleLogCreated = ((created: RestaurantLog) => {
    const nextLog = [created, ...props.restaurantState.log];
    console.log("CREATED BX LOG", created, nextLog)

    setRestaurantState({
      log: nextLog
    });
  });

  const handleLogDeleted = ((deleted: RestaurantLog) => {
    const nextLog = props.restaurantState.log.filter(it => it != deleted);
    setRestaurantState({
      log: nextLog
    });
  });

  const logColumns = logcolumns(
    handleLogChanged
  );

  return <Example
    columns={logColumns}
    items={restaurantState.log}
    onCreate={handleLogCreated}
    onDelete={handleLogDeleted}
    getRowId={(log) => JSON.stringify(log)}
    defaultVaue={() => defaultLog()} />;
};

const logcolumns = (onChange: (change: { prev: RestaurantLog; next: RestaurantLog; }) => void): MRT_ColumnDef<RestaurantLog>[] => [
  {
    accessorFn: (it) => it.date.format("gggg-MM-DD"),
    header: 'Date',
    id: 'date',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'date',
      required: true,
      onChange: (event) => {
        const next = withPartial(row.original, {
          date: moment(event.target.value, 'gggg-MM-DD')
        });
        onChange({ prev: row.original, next: next });
      },
    })
  },
  {
    accessorFn: (it) => it.dish,
    header: 'Dish',
    id: 'dish',
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
  {
    accessorFn: (it) => it.rating,
    header: 'Rating',
    id: 'rating',
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
    id: 'notes',
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
