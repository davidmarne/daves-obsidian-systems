import * as React from 'react';
import { IngredientUnits, IngredientUsage, Recipe } from 'src/eating/resource_access/recipe/recipe';
import { PartialUpdater, withPartial } from 'src/common/react_util';
import Example from '../Datatable';
import { defaultUsage } from './CreateRecipeForm';
import { MRT_ColumnDef } from "material-react-table";
import { AutocompleteOrCreate } from '../../../../common/AutocompleteOrCreate';
import { Ingredient } from 'src/eating/resource_access/ingredient/ingredient';

export const SetMeasurmentsForm = (props: {
  ingredients: string[];
  recipeState: Recipe;
  setRecipeState: PartialUpdater<Recipe>;
}) => {
  const { recipeState, setRecipeState } = props;

  const handleIngredientUsageChanged = ((change: { prev: IngredientUsage; next: IngredientUsage; }) => {
    const nextUsages = props.recipeState.ingredientUsages
      .map(item => item == change.prev ? change.next : item);

    setRecipeState({
      ingredientUsages: nextUsages
    });
  });

  const handleIngredientUsageCreated = ((created: IngredientUsage) => {
    const nextUsages = [created, ...props.recipeState.ingredientUsages];
    setRecipeState({
      ingredientUsages: nextUsages
    });
  });

  const handleIngredientUsageDeleted = ((deleted: IngredientUsage) => {
    const nextUsages = props.recipeState.ingredientUsages.filter(it => it != deleted);
    setRecipeState({
      ingredientUsages: nextUsages
    });
  });

  const usageColumns = columns(
    props.ingredients,
    handleIngredientUsageChanged
  );

  return <Example
    columns={usageColumns}
    items={recipeState.ingredientUsages}
    onCreate={handleIngredientUsageCreated}
    onDelete={handleIngredientUsageDeleted}
    getRowId={(usage) => usage.ingredient.name}
    defaultVaue={() => defaultUsage(new Date().getMilliseconds().toString())} />;
  };
  
const columns = (ingredients: string[], onChange: (change: { prev: IngredientUsage; next: IngredientUsage; }) => void): MRT_ColumnDef<IngredientUsage>[] => [
  {
    accessorFn: (it) => it.ingredient.name,
    header: 'Ingredient',
    Edit: (cellProps) => (<AutocompleteOrCreate
      label='Ingredient'
      options={ingredients}
      selected={cellProps.row.original.ingredient.name}
      onChange={(selected) => {
        const selectedOrEmpty = selected || '';
        const next = withPartial(cellProps.row.original, {
          ingredient: new Ingredient(selectedOrEmpty)
        });
        onChange({ prev: cellProps.row.original, next: next });
      } } />)
  },
  {
    accessorFn: (it) => it.amount,
    header: 'Amount',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'number',
      required: true,
      onChange: (event) => {
        const next = withPartial(row.original, {
          amount: +event.target.value
        });
        onChange({ prev: row.original, next: next });
      },
    }),
  },
  {
    accessorFn: (it) => it.unit,
    header: 'Unit',
    Edit: (cellProps) => (<AutocompleteOrCreate
      label='Unit'
      options={IngredientUnits}
      selected={cellProps.row.original.unit}
      onChange={(selected) => {
        const selectedOrEmpty = selected || '';
        const next = withPartial(cellProps.row.original, {
          unit: selectedOrEmpty
        });
        onChange({ prev: cellProps.row.original, next: next });
      } } />)
  },
];

