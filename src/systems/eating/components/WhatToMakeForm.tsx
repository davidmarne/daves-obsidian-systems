import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IngredientUnits, IngredientUsage, Recipe, RecipeKind, RecipeKinds } from 'src/systems/eating/resource_access/recipe';
import { useCallback, useState, useMemo, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Autocomplete, Container, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Ingredient } from 'src/systems/eating/resource_access/ingredient';
import { Reference } from 'src/systems/travel/resource_access/location';

const steps = ['Select Recipe Kinds', 'Select Ingredients', 'Select Recipes'] as const;

interface WhatToMakeState {
    activeStep: number,
    selectedKinds: RecipeKind[],
    selectedIngredients: Reference<Ingredient>[],
    selectedRecipes: Recipe[]
}

const calculateRecipeRankings = (recipes: Recipe[], selectedIngredients: {[key:string]: boolean}) => {
    const rankings: { [key: string]: number } = {}
    for (const recipe of recipes) {
        let ingredientInstock = 0;
        for (const ingredientUsage of recipe.ingredientUsages) {
            if (selectedIngredients[ingredientUsage.ingredient]) {
                ingredientInstock++;
            }
        }
        rankings[recipe.name] = Math.round(ingredientInstock / recipe.ingredientUsages.length * 100);
    }
    return rankings;
}

const calculateIngredientsForSelectedRecipeKinds = (recipes: Recipe[], selectedKinds: RecipeKind[]) => {
    const kindLookup: {[key: string]: boolean} = {};
    for (const kind of selectedKinds) {
        kindLookup[kind] = true;
    }

    const ingredientSet = new Set<Reference<Ingredient>>();
    for (const recipe of recipes) {
        if (kindLookup[recipe.kind]) {
            recipe.ingredientUsages
                .map(it => it.ingredient)
                .forEach(it => ingredientSet.add(it));
        }
    }
    return [...ingredientSet];
}


export const WhatToMakeForm = (props: {
    defaultKinds: RecipeKind[],
    ingredientsInStock: Ingredient[],
    recipes: Recipe[],
    handleSelectedIngredients: (recipes: Ingredient[]) => void,
    handleSubmit: (recipe: Recipe[]) => void,
}) => {

    // TODO: implement, maybe cleanup defaultSelectedIngredients after?
    const recipeKindToIngredients: { [key: string]: { [key: string]: boolean } } = {};

    const defaultSelectedIngredients: Reference<Ingredient>[] = useMemo(() => {
        const selected = props.defaultKinds
            ? props.ingredientsInStock.filter(ig => {
                if (!props.defaultKinds) return false;
                props.defaultKinds.filter(kind => {
                    const ingredientsForKind = recipeKindToIngredients[kind];
                    return ingredientsForKind && ingredientsForKind[ig.name]
                }).length > 0
            })
            : props.ingredientsInStock
        return selected.map(it => it.name);
    }, [])

    const [recipeState, setRecipeState] = useState<WhatToMakeState>({
        activeStep: props.defaultKinds.length > 0 ? 1 : 0,
        selectedKinds: props.defaultKinds || [],
        selectedIngredients: defaultSelectedIngredients,
        selectedRecipes: [],
    });


    const ingredientLookup = useMemo(() => {
        const lookup: {[key:string]: boolean} = {};
        for (const ingredient of recipeState.selectedIngredients) {
            lookup[ingredient] = true;
        }
        return lookup;
    }, [recipeState.selectedIngredients]);

    const ingredientsForSelectedRecipeKinds = useMemo(
        () => calculateIngredientsForSelectedRecipeKinds(props.recipes, recipeState.selectedKinds), 
        [recipeState.selectedKinds]);

    const recipeRankings = useMemo(
        () => calculateRecipeRankings(props.recipes, ingredientLookup), 
        [recipeState.selectedIngredients]);

    const recipeLookup = useMemo(() => {
        const lookup: {[key:string]: Recipe} = {};
        for (const recipe of props.recipes) {
            lookup[recipe.name] = recipe;
        }
        return lookup;
    }, [])

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
        props.handleSubmit(recipeState.selectedRecipes)
    }, [props, recipeState])

    let content: React.ReactElement;
    if (recipeState.activeStep === 0) {
        content = <SelectRecipeKindsContent
            recipeState={recipeState}
            setRecipeState={setRecipeState} />
    } else if (recipeState.activeStep === 1) {
        content = <SelectIngredientsContent
            ingredients={ingredientsForSelectedRecipeKinds}
            recipeState={recipeState}
            setRecipeState={setRecipeState} />
    } else {
        content = <SelectRecipesContent
            recipeLookup={recipeLookup}
            recipeRankings={recipeRankings}
            recipeState={recipeState}
            setRecipeState={setRecipeState} />
    }

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
                {content}
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

const SelectRecipeKindsContent = (props: {
    recipeState: WhatToMakeState,
    setRecipeState: Dispatch<SetStateAction<WhatToMakeState>>
}) => {
    const handleRecipeKindChange = useCallback((event: SelectChangeEvent<RecipeKind[]>) => {
        props.setRecipeState(Object.assign({}, props.recipeState, {
            selectedKinds: event.target.value,
        }));
    }, [props.recipeState])

    return <Select
        label="Kinds"
        sx={{ mt: 1 }}
        fullWidth
        multiple
        value={props.recipeState.selectedKinds}
        onChange={handleRecipeKindChange}>
        {RecipeKinds.map(kind => <MenuItem key={kind} value={kind}>{kind}</MenuItem>)}
    </Select>;
}


const SelectRecipesContent = (props: {
    recipeLookup: {[key:string]: Recipe},
    recipeRankings:  { [key: string]: number },
    recipeState: WhatToMakeState,
    setRecipeState: Dispatch<SetStateAction<WhatToMakeState>>
}) => {
    const handleRecipesChange = useCallback((event: SelectChangeEvent<string[]>) => {
        props.setRecipeState(Object.assign({}, props.recipeState, {
            // TODO: Wtf why do i need to cast this?
            selectedRecipes: (event.target.value as string[]).map(name => props.recipeLookup[name]),
        }));
    }, [props.recipeState])

    const recipesSorted = useMemo(() => {
        return Object.keys(props.recipeLookup)
            .sort((a, b) => props.recipeLookup[a] > props.recipeLookup[b] ? 1 : -1)
    }, []);

    return <Select
        label="Kinds"
        sx={{ mt: 1 }}
        fullWidth
        multiple
        value={props.recipeState.selectedRecipes.map(recipe => recipe.name)}
        onChange={handleRecipesChange}>
        {recipesSorted.map(recipe => <MenuItem 
            key={recipe}
            value={recipe}>
                {`${recipe} - ${props.recipeRankings[recipe]}`}
        </MenuItem>)}
    </Select>;
}

const SelectIngredientsContent = (props: {
    ingredients: Reference<Ingredient>[],
    recipeState: WhatToMakeState,
    setRecipeState: Dispatch<SetStateAction<WhatToMakeState>>
}) => {
    const { recipeState, setRecipeState } = props;

    const handleIngredientsChange = useCallback((_: any, selected: Reference<Ingredient>[]) => {
        setRecipeState(Object.assign({}, recipeState, {
            selectedIngredients: selected
        }));
    }, [recipeState])

    return <Box
        component="form"
        sx={{ mt: 1 }}>
        <Autocomplete
            multiple
            sx={{ mt: 1 }}
            fullWidth
            options={props.ingredients}
            value={recipeState.selectedIngredients}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            onChange={handleIngredientsChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Ingredient Name"
                    placeholder="Favorites" />
            )} />
    </Box>;
};