import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IngredientUnits, IngredientUsage, Recipe, RecipeKind, RecipeKinds } from 'src/eating/resource_access/recipe/recipe';
import { useCallback, useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Autocomplete, Container, FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Ingredient } from 'src/eating/resource_access/ingredient/ingredient';


const steps = ['Create Recipe', 'Measurements'] as const;
type CreateRecipeSteps = typeof steps[number]

interface CreatRecipePageOneState {
  activeStep: number,
  name: string,
  kind: RecipeKind,
  selectedIngredients: string[],
  ingredientUsages: {[key: string]: IngredientUsage},
  ingredientAutoCompleteInput?: string,
}

const defaultUsage = (ingredient: string): IngredientUsage => {
  return {
    ingredient: new Ingredient(ingredient),
    amount: 1,
    unit: IngredientUnits[0],
  }
}

const defaultUsageMap = (usages: IngredientUsage[]) => {
  const map: {[key: string]: IngredientUsage} = {};
  for (const usage of usages) {
    map[usage.ingredient.name] =  usage;
  }
  return map;
}

export const CreateRecipeForm = (props: {
  defaultRecipe?: Recipe,
  ingredients: string[],
  handleSubmit: (recipe: Recipe) => void,
}) => {
  const [recipeState, setRecipeState] = useState<CreatRecipePageOneState>({
    activeStep: 0,
    name: props.defaultRecipe?.name || '',
    kind: props.defaultRecipe?.kind || 'entre',
    selectedIngredients: props.defaultRecipe?.ingredientUsages.map(it => it.ingredient.name) || [],
    ingredientUsages: props.defaultRecipe 
      ? defaultUsageMap(props.defaultRecipe.ingredientUsages) 
      : {},
  });

  const handleNext = useCallback(() => {
    setRecipeState(Object.assign({}, recipeState, {
      activeStep: recipeState.activeStep + 1,
    }));
  }, [recipeState])

  const handleBack = useCallback(() => {
    setRecipeState(Object.assign({}, recipeState, {
      activeStep: recipeState.activeStep - 1,
    }));
  }, [recipeState])

  const handleSubmit = useCallback(() => {
    const selectedIngredientsLookup: { [key: string]: boolean } = {}
    recipeState.selectedIngredients.forEach(it => selectedIngredientsLookup[it] = true)
    const finalIngredients = recipeState.selectedIngredients.map(it => recipeState.ingredientUsages[it] ?? defaultUsage(it))
    props.handleSubmit(
      new Recipe(recipeState.name, recipeState.kind, finalIngredients, new URL("http://example.com"), "TODO", []),
    )
  }, [props, recipeState])

  const activeStep = recipeState.activeStep;
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) =>
          <Step key={label} completed={activeStep > index}>
            <StepLabel>{label}</StepLabel>
          </Step>)}
      </Stepper>
      <Container>
        {
          activeStep === 0
            ? <CreateRecipeContent
              ingredients={props.ingredients}
              recipeState={recipeState}
              setRecipeState={setRecipeState} />
            : <SetMeasurmentsForm
              recipeState={recipeState}
              setRecipeState={setRecipeState} />
        }
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1
            ? <Button onClick={handleSubmit}>Finish</Button>
            : <Button onClick={handleNext}>Next</Button>
          }
        </Box>
      </Container>
    </Box>
  );
}

const CreateRecipeContent = (props: {
  ingredients: string[],
  recipeState: CreatRecipePageOneState,
  setRecipeState: Dispatch<SetStateAction<CreatRecipePageOneState>>
}) => {
  const { recipeState, setRecipeState } = props;

  let ingredientNames = props.ingredients;
  if (recipeState.ingredientAutoCompleteInput) {
    ingredientNames = [recipeState.ingredientAutoCompleteInput, ...ingredientNames]
  }
  if (recipeState.selectedIngredients) {
    ingredientNames = [...new Set([...ingredientNames, ...recipeState.selectedIngredients])];
  }

  const handleRecipeNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRecipeState(Object.assign({}, recipeState, {
      name: event.target.value
    }));
  }, [recipeState])

  const handleRecipeKindChange = useCallback((event: SelectChangeEvent<string>) => {
    setRecipeState(Object.assign({}, recipeState, {
      kind: event.target.value
    }));
  }, [recipeState])

  const handleIngredientSuggestionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRecipeState(Object.assign({}, recipeState, {
      ingredientAutoCompleteInput: event.target.value
    }));
  }, [recipeState])

  const handleIngredientsChange = useCallback((_: any, selected: string[]) => {
    setRecipeState(Object.assign({}, recipeState, {
      ingredientAutoCompleteInput: undefined,
      selectedIngredients: selected
    }));
  }, [recipeState])

  return <Box
    component="form"
    sx={{ mt: 1 }}>
    <TextField
      required
      fullWidth
      value={recipeState.name}
      onChange={handleRecipeNameChange}
      sx={{ mt: 1 }}
      label="Recipe Name"
      name="name"
      autoFocus />
    <Select
      label="Kind"
      sx={{ mt: 1 }}
      fullWidth
      value={recipeState.kind}
      onChange={handleRecipeKindChange}>
      {RecipeKinds.map(kind => <MenuItem key={kind} value={kind}>{kind}</MenuItem>)}
    </Select>
    <Autocomplete
      multiple
      sx={{ mt: 1 }}
      fullWidth
      options={ingredientNames}
      value={recipeState.selectedIngredients}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      onChange={handleIngredientsChange}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={handleIngredientSuggestionChange}
          label="Ingredient Name"
          placeholder="Favorites" />
      )} />
  </Box>;
};

const SetMeasurmentsForm = (props: {
  recipeState: CreatRecipePageOneState,
  setRecipeState: Dispatch<SetStateAction<CreatRecipePageOneState>>
}) => {
  const { recipeState, setRecipeState } = props;

  const [unitAutocompleteInputValues , setUnitAutocompleteInputValue] = useState<{[key: string]: string}>({});
  const handleAutocompleteInputValueChanged = (ingredient: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const toMerge: {[key: string]: string} = {};
    toMerge[ingredient] = event.target.value;
    setUnitAutocompleteInputValue(Object.assign({}, unitAutocompleteInputValues, toMerge));
  }

  const handleIngredientUsageAmountChanged = (ingredient: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const existingUsage = recipeState.ingredientUsages[ingredient] || defaultUsage(ingredient);
    const nextUsage = Object.assign({}, existingUsage, {amount: Number(event.target.value)});
    const nextUsageMergeObj: {[key: string]: IngredientUsage} = {}
    nextUsageMergeObj[ingredient] = nextUsage
    const nextUsages = Object.assign({}, recipeState.ingredientUsages, nextUsageMergeObj);
    setRecipeState(Object.assign({}, recipeState, {
      ingredientUsages: nextUsages
    }));
  }

  const handleIngredientUsageUnitChanged = (ingredient: string) => ((_: any, value: string) => {
    const existingUsage = recipeState.ingredientUsages[ingredient] || defaultUsage(ingredient);
    const nextUsage = Object.assign({}, existingUsage, {unit: value});
    const nextUsageMergeObj: {[key: string]: IngredientUsage} = {}
    nextUsageMergeObj[ingredient] = nextUsage
    const nextUsages = Object.assign({}, recipeState.ingredientUsages, nextUsageMergeObj);
    setRecipeState(Object.assign({}, recipeState, {
      ingredientUsages: nextUsages
    }));

    const newState = Object.assign({}, unitAutocompleteInputValues);
    delete newState[ingredient]
    setUnitAutocompleteInputValue(newState);
  });

  return <Box
    component="form"
    sx={{ mt: 1 }}>
    {recipeState.selectedIngredients.map((it, idx) => {
      const inputValue = unitAutocompleteInputValues[it] || recipeState.ingredientUsages[it]?.unit || IngredientUnits[0];
      let options: string[] = [...IngredientUnits];
      if (unitAutocompleteInputValues[it]) {
        options = [unitAutocompleteInputValues[it], ...options]
      }
      if (recipeState.ingredientUsages[it]?.unit && !options.contains(recipeState.ingredientUsages[it].unit)) {
        options = [recipeState.ingredientUsages[it].unit, ...options]
      }
      return <Box key={it} sx={{ mt: 1 }}>
        <Typography variant="h6" component="h6">
          {it}
        </Typography>
        <TextField type='number' defaultValue={1} onChange={handleIngredientUsageAmountChanged(it)} />
        <Autocomplete
          sx={{ mt: 1 }}
          key={it}
          options={options}
          inputValue={inputValue}
          value={recipeState.ingredientUsages[it]?.unit || IngredientUnits[0]}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          onInputChange={handleAutocompleteInputValueChanged(it)}
          onChange={handleIngredientUsageUnitChanged(it)}
          renderInput={(params) => (
              <TextField
                  {...params}
                  label="Kind"
                  placeholder="Select" />
          )} />
      </Box>
    })}
  </Box>
}
