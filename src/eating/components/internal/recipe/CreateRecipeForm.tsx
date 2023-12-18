import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IngredientUnits, IngredientUsage, Recipe, RecipeKind, RecipeKinds, RecipeLog } from 'src/eating/resource_access/recipe/recipe';
import { useCallback, useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Container, FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Ingredient } from 'src/eating/resource_access/ingredient/ingredient';
import { PartialUpdater, useStateWithPartialUpdater } from 'src/common/react_util';
import { ingredientsPath } from 'src/eating/resource_access/ingredient/ingredient_resource_access';
import moment from 'moment';
import { SetMeasurmentsForm } from './SetMeasurmentsForm';
import { SetRecipeLogForm } from './SetRecipeLogForm';


const steps = ['Create Recipe', 'Measurements', 'Log'] as const;
type CreateRecipeSteps = typeof steps[number]

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

