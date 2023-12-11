import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IngredientUnits, IngredientUsage, Recipe, RecipeKind, RecipeKinds, RecipeLog } from 'src/eating/resource_access/recipe/recipe';
import { useCallback, useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Autocomplete, Container, FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Ingredient } from 'src/eating/resource_access/ingredient/ingredient';
import { PartialUpdater, useStateWithPartialUpdater } from 'src/common/react_util';
import { ingredientsPath } from 'src/eating/resource_access/ingredient/ingredient_resource_access';
import moment from 'moment';
import { SetMeasurmentsForm } from './SetMeasurmentsForm';
import { SetRecipeLogForm } from './SetRecipeLogForm';


const steps = ['Create Recipe', 'Measurements', 'Log'] as const;
type CreateRecipeSteps = typeof steps[number]

// interface CreatRecipePageOneState {
//   activeStep: number,
//   name: string,
//   kind: RecipeKind,
//   selectedIngredients: string[],
//   ingredientUsages: {[key: string]: IngredientUsage},
//   ingredientAutoCompleteInput?: string,
// }

export const defaultUsage = (ingredient: string): IngredientUsage => {
  return {
    ingredient: new Ingredient(ingredient),
    amount: 1,
    unit: IngredientUnits[0],
  }
}


const defaultRecipe = new Recipe('', 'entre', [], '', '', []);

export const CreateRecipeForm = (props: {
  defaultRecipe?: Recipe,
  ingredients: string[],
  handleSubmit: (recipe: Recipe) => void,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const [recipeState, setRecipeState] = useStateWithPartialUpdater<Recipe>(props.defaultRecipe || defaultRecipe);

  const handleNext = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep])

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep])

  const handleSubmit = useCallback(() => {
    props.handleSubmit(recipeState);
  }, [props.handleSubmit, recipeState])
    
  let component: React.ReactElement;
  if (activeStep === 0) {
    component =  <CreateRecipeContent
      ingredients={props.ingredients}
      recipeState={recipeState}
      setRecipeState={setRecipeState} />
  } else if (activeStep === 1) {
    component = <SetMeasurmentsForm
      ingredients={props.ingredients}
      recipeState={recipeState}
      setRecipeState={setRecipeState} />
  } else {
    component = <SetRecipeLogForm
      recipeState={recipeState}
      setRecipeState={setRecipeState} />
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) =>
          <Step key={label} completed={activeStep > index}>
            <StepLabel>{label}</StepLabel>
          </Step>)}
      </Stepper>
      <Container>
        {component}
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
  recipeState: Recipe,
  setRecipeState: PartialUpdater<Recipe>
}) => {
  const { recipeState, setRecipeState } = props;

  const handleRecipeNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRecipeState({
      name: event.target.value
    });
  }, [setRecipeState])

  const handleRecipeKindChange = useCallback((event: SelectChangeEvent<string>) => {
    setRecipeState({
      kind: event.target.value as RecipeKind
    });
  }, [setRecipeState])

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
  </Box>;
};

export const AutocompleteOrCreate = (props: {
  label: string,
  options: string[],
  selected: string,
  onChange: (selected: string | null) => void
}) => {

  const [autocompleteInputValue, setAutocompleteInputValue] = useState<string>('');
  
  let options = !props.options.contains(autocompleteInputValue)
    ? [autocompleteInputValue, ...props.options]
    : props.options;

  options = !props.options.contains(props.selected)
    ? [props.selected, ...props.options]
    : props.options;

  return <Autocomplete
    sx={{ mt: 1 }}
    options={options}
    inputValue={autocompleteInputValue}
    value={props.selected}
    getOptionLabel={(option) => option}
    filterSelectedOptions
    onInputChange={(_, value) => setAutocompleteInputValue(value)}
    onChange={(_, value) => props.onChange(value)}
    renderInput={(params) =>
        <TextField
            {...params}
            variant='standard'
            placeholder="Select" />}
            />;
}

// const AutocompleteOrCreateMulti = (props: {
//   label: string,
//   options: string[],
//   selected: string[],
//   onChange: (selected: string[]) => void
// }) => {

//   const [autocompleteInputValue, setAutocompleteInputValue] = useState<string | undefined>(undefined);
  
//   const options = autocompleteInputValue
//     ? [autocompleteInputValue, ...props.options]
//     : props.options;

//   return <Autocomplete
//     sx={{ mt: 1 }}
//     options={options}
//     multiple
//     inputValue={autocompleteInputValue}
//     value={props.selected}
//     getOptionLabel={(option) => option}
//     filterSelectedOptions
//     onInputChange={(_, value) => setAutocompleteInputValue(value)}
//     onChange={(_, value) => props.onChange(value)}
//     renderInput={(params) =>
//         <TextField
//             {...params}
//             variant='standard'
//             placeholder="Select" />}
//             />;
// }

// interface BaseInputType {
//   type: string,
//   name: string
// }

// interface TextType extends BaseInputType {
//   type: "text"
// }

// interface NumberType extends BaseInputType {
//   type: "number"
// }

// interface URLType extends BaseInputType {
//   type: "url"
// }

// interface DateType extends BaseInputType {
//   type: "date"
// }

// interface SelectType extends BaseInputType {
//   type: "select",
//   options: string[],
//   lazyCreation: boolean,
// }

// interface ReferenceType extends BaseInputType {
//   type: "reference"
//   path: string,
//   multiple: boolean,
// }

// interface TableType<T, R> extends BaseInputType {
//   type: "table"
//   rows: (item: T) => R[],
//   columns: InputType[]
// }

// type InputType = TextType 
//   | SelectType 
//   | ReferenceType 
//   | TableType<any, any>;

// const recipes = (recipe: Recipe): InputType[] => [
//   {
//     type: "text",
//     name: "name"
//   },
//   {
//     type: "select",
//     name: "kind",
//     options: RecipeKinds,
//     lazyCreation: false
//   },
//   {
//     type: "url",
//     name: "source"
//   },
//   {
//     type: "text",
//     name: "description"
//   },
//   {
//     type: "table",
//     name: "ingredientUsages",
//     rows: (it: Recipe) => it.ingredientUsages,
//     columns: [
//       {
//         type: "reference",
//         name: "ingredient",
//         path: ingredientsPath,
//         multiple: false,
//       },
//       {
//         type: "number",
//         name: "amount",
//       },
//       {
//         type: "select",
//         name: "unit",
//         options: IngredientUnits,
//         lazyCreation: true,
//       },
//     ]
//   },
//   {
//     type: "table",
//     name: "log",
//     columns: [
//       { type: "date", name: "date"},
//       { type: "number", name: "rating"},
//       { type: "text", name: "notes"},
//     ]
//   }
// ];

// const rendertext = (input: TextType) => {
//   return <TextField
//       required
//       fullWidth
//       value={recipeState.name}
//       onChange={handleRecipeNameChange}
//       sx={{ mt: 1 }}
//       label="Recipe Name"
//       name="name"
//       autoFocus /> 
// }

// const renderform = (inputs: InputType[]) => {

// }