import { MRT_ColumnDef } from "material-react-table";
import moment, { Moment } from "moment";
import { useStateWithPartialUpdater, withPartial } from "./react_util";
import { Box, Button, Container, MenuItem, Select, TextField } from "@mui/material";
import * as React from 'react';
import { AutocompleteOrCreateMulti } from "./AutocompleteOrCreateMulti";
import { AutocompleteMulti } from "./AutocompleteMulti";
import { AutocompleteOrCreate } from "./AutocompleteOrCreate";
import { Note } from "./note";
import { Reference } from "src/systems/travel/resource_access/location";
import Example from "./Datatable";

export type TableFactory<R extends Record<string, any>, P, T> = (property: P, onChange: (rowId: string, value: T) => void) => MRT_ColumnDef<R>;

export type TableConfig<T extends Record<string, any>> = {
  [Property in keyof T]: TableFactory<T, Property, T[Property]> | null
  // [Property in keyof T]: (property: Property, onChange: (previous: T) => void | Promise<void>) MRT_ColumnDef<T>;
}

export type FormElementFactory<R extends Record<string, any>, P, T> = (property: P, value: T, onChange: (value: T) => void) => React.ReactElement;

export type FormConfig<T extends Record<string, any>> = {
  [Property in keyof T]: FormElementFactory<T, Property, T[Property]> | null
}

export const dateColumn = <T extends Record<string, any>, P extends keyof T>(): TableFactory<T, P, Moment> => (
  property: P,
  onChange: (rowId: string, next: Moment) => void | Promise<void>
): MRT_ColumnDef<T> => ({
  accessorFn: (it) => {
    return it[property].format("gggg-MM-DD");
  },
  header: property as string,
  id: property as string,
  muiEditTextFieldProps: ({ cell, row }) => ({
    type: 'date',
    required: true,
    onChange: (event) => {
      onChange(row.id, moment(event.target.value, 'gggg-MM-DD'));
    },
  })
});

export const textColumn = <T extends Record<string, any>, P extends keyof T>(): TableFactory<T, P, string> => (
  property: P,
  onChange: (rowId: string, next: string) => void | Promise<void>
): MRT_ColumnDef<T> => ({
  accessorFn: (it) => it[property],
  header: property as string,
  id: property as string,
  muiEditTextFieldProps: ({ cell, row }) => ({
    type: 'text',
    required: true,
    onChange: (event) => {
      onChange(row.id, event.target.value);
    },
  }),
});


export const numberColumn = <T extends Record<string, any>, P extends keyof T>(): TableFactory<T, P, number> => (
  property: P,
  onChange: (rowId: string, next: number) => void | Promise<void>
): MRT_ColumnDef<T> => ({
  accessorFn: (it) => it[property],
  header: property as string,
  id: property as string,
  muiEditTextFieldProps: ({ cell, row }) => ({
    type: 'number',
    required: true,
    onChange: (event) => {
      onChange(row.id, +event.target.value);
    },
  }),
});

export const GenericForm = <T extends Record<string, any>>(props: {
  defaultState: T,
  config: FormConfig<T>,
  onChange: (item: T) => void | Promise<void>,
}) => {
  const [state, update] = useStateWithPartialUpdater(props.defaultState);

  const elements = Object.entries<FormElementFactory<T, any, any> | null>(props.config)
    .map(([property, factory]) => {
      if (factory === null) {
        return null;
      }
      console.log("call factory with ",property, state[property] )
      return factory(property, state[property], (newValue) => {
        update({ [property]: newValue } as Partial<T>)
      });
    }).flatMap(f => f ? [f] : []); // flatmap filter's null and maps type to be not null

  return <Box sx={{ width: '100%' }}>
    <Container>
      <Box
        component="form"
        sx={{ mt: 1 }}>
        {elements}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={() => props.onChange(state)}>Submit</Button>
      </Box>
    </Container>
  </Box>;
}

export const GenericTable = <T extends Record<string, any>>(
  items: T[],
  onChange: (items: T[]) => void | Promise<void>,
  defaultState: () => T,
  config: TableConfig<T>,
) => {
  const [state, update] = React.useState(items);

  const getRowId = (row: T) => JSON.stringify(row);

  const updateStateAndParent = (state: T[]) => {
    update(state);
    onChange(state);
  };

  const columns = Object.entries<TableFactory<T, any, any> | null>(config)
    .map(([property, factory]) => {
      if (factory === null) {
        return null;
      }
      return factory(property, (rowId, newValue) => {
        // update({[property]: newValue} as Partial<T>)
        const nextState = state
          .map(item => getRowId(item) === rowId
            ? withPartial(item, { [property]: newValue } as Partial<T>)
            : item);
        updateStateAndParent(nextState);
      });
    }).flatMap(f => f ? [f] : []); // flatmap filter's null and maps type to be not null
console.log("COLSUMNS IS ", columns, items)
  const handleLogCreated = ((created: T) => {
    const nextState = [created, ...state];
    updateStateAndParent(nextState);
  });

  const handleLogDeleted = ((deleted: T) => {
    const nextState = state.filter(it => it != deleted);
    updateStateAndParent(nextState);
  });

  return <Example
    key="TODO"
    columns={columns}
    items={state}
    onCreate={handleLogCreated}
    onDelete={handleLogDeleted}
    getRowId={getRowId}
    defaultVaue={() => defaultState()} />;
}

export const stringFormElement = (property: string, value: string, onChange: (value: string) => void | Promise<void>) => <TextField
  required
  fullWidth
  value={value}
  onChange={(e) => onChange(e.target.value)}
  sx={{ mt: 1 }}
  label={property}
  name={property}
  key={property}
  autoFocus />;

export const numberFormElement = (property: string, value: number, onChange: (value: number) => void | Promise<void>) => <TextField
    required
    fullWidth
    type='number'
    value={value}
    onChange={(e) => onChange(+e.target.value)}
    sx={{ mt: 1 }}
    label={property}
    name={property}
    key={property}
    autoFocus />;

export const multilineStringFormElement = (property: string, value: string, onChange: (value: string) => void | Promise<void>) => <TextField
  required
  fullWidth
  multiline
  value={value}
  onChange={(e) => onChange(e.target.value)}
  sx={{ mt: 1 }}
  label={property}
  name={property}
  key={property}
  autoFocus />;


export const tableFormElement = function <T extends Record<string, any>>(defaultT: () => T, tableConfig: TableConfig<T>) {
  return (property: string, value: T[], onChange: (value: T[]) => void | Promise<void>) =>
    GenericTable(value, onChange, defaultT, tableConfig);
}

export const selectFormElement = <T extends string>(options: T[]) =>
  (property: string, value: T, onChange: (value: T) => void) =>
    <Select
      label={property}
      key={property}
      sx={{ mt: 1 }}
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value as T)}>
      {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
    </Select>;


export const multiSelectFormElement = <T extends string>(options: T[]) => (property: string, value: T[], onChange: (value: T[]) => void) =>
  <AutocompleteMulti
    options={options}
    selected={value}
    key={property}
    onChange={onChange}
    label={property} />;

export const multiSelectOrCreate = <T extends string>(options: T[]) => (property: string, value: T[], onChange: (value: T[]) => void) =>
  <AutocompleteOrCreateMulti
    options={options}
    selected={value}
    key={property}
    onChange={onChange}
    label={property} />;

export const selectOrCreate = <T extends string>(options: T[]) => (property: string, value: T, onChange: (value: T) => void) =>
  <AutocompleteOrCreate
    options={options}
    selected={value}
    key={property}
    onChange={onChange}
    label={property} />;

export const selectOrCreatNote = <T extends Note>(options: T[]) => (property: string, value: T, onChange: (value: Reference<T>) => void) => {
  const lookup: { [key: string]: T } = {};
  for (const option of options) {
    lookup[option.name] = option;
  }
  return <AutocompleteOrCreate
    options={options.map(it => it.name)}
    selected={value.name}
    key={property}
    onChange={(it) => onChange(
      it !== null
        ? it
        : 'untitled'
    )}
    label={property} />;
}


export const selectOrCreatNoteColumn = <N extends Note, T extends Record<string, any>, P extends keyof T>(
  options: N[]
): TableFactory<T, P, Reference<N>> => (
  property: P,
  onChange: (rowId: string, next: Reference<N>) => void | Promise<void>
): MRT_ColumnDef<T> => ({
  accessorFn: (it) => it[property],
  header: property as string,
  Edit: (cellProps) => selectOrCreatNote<N>(options)(
    property as string,
    cellProps.row.original[property],
    (value) => onChange(cellProps.row.id, value)
  )
});