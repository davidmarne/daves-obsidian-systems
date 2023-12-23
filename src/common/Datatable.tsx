import { useMemo, useState } from 'react';
import * as React from 'react';

import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
  createRow,
} from 'material-react-table';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IngredientUsage } from 'src/systems/eating/resource_access/recipe';
import { Note } from 'src/common/note';


export const Example = function<T extends Record<string, any>>(props: {
    items: T[],
    columns: MRT_ColumnDef<T>[],
    onCreate: (item: T) => void,
    onDelete: (item: T) => void,
    getRowId: (item: T) => string,
    defaultVaue?: () => T
}) {
  const table = useMaterialReactTable({
    columns: props.columns,
    data: props.items,
    initialState: { density: 'compact' },    
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    getRowId: props.getRowId,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    // onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: (p) => props.onCreate(p.values as T),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => props.onDelete(row.original)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(props.defaultVaue 
            ? createRow(table, props.defaultVaue())
            : true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create
      </Button>
    ),
    // state: {
    //   isLoading: isLoadingIngredientUsages,
    //   isSaving: isCreatingIngredientUsage || isUpdatingIngredientUsages || isDeletingIngredientUsage,
    //   showAlertBanner: isLoadingIngredientUsagesError,
    //   showProgressBars: isFetchingIngredientUsages,
    // },
  });

  return <MaterialReactTable table={table} />;
};


export default Example;


