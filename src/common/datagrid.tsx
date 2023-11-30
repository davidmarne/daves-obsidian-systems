import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Recipe, RecipeKinds } from 'src/eating/resource_access/recipe/recipe';

export default function BasicEditingGrid(props: {recipes: Recipe[]}) {
return (
    <DataGrid rows={rows(props.recipes)} columns={columns} />
  );
}

const columns: GridColDef[] = [
  { 
    field: 'name', 
    headerName: 'Name', 
    editable: true 
  },
  {
    field: 'kind',
    headerName: 'Kind',
    type: 'singleSelect',
    editable: true,
    valueOptions: RecipeKinds.map(it => {
        return {value: it, label: it}
    }),
  },
  {
    field: 'source',
    headerName: 'Source',
    type: 'string',
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'string',
    editable: true,
  },
];

const rows = (recipes: Recipe[]): GridRowsProp => recipes.map(it => {
    return {
        id: 1,
        name: it.name,
        kind: it.kind,
        source: it.source,
        description: it.description,
      }
});