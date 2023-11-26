import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IngredientUnits, IngredientUsage, Recipe, RecipeKind, RecipeKinds } from 'src/eating/resource_access/recipe/recipe';
import { useCallback, useState, useMemo, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Autocomplete, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Ingredient } from 'src/eating/resource_access/ingredient/ingredient';
import { Inspiration } from 'src/music/resource_access/inspiration/inspiration';
import { PracticeExercise } from 'src/music/resource_access/practice_exercise/practice_exercise';
import { LearningResource } from 'src/music/resource_access/learning_resource/learning_resource';
import { stat } from 'fs';

const Kinds = [ "Inspiration", "Practice Exercise", "Learning Resource"] as const;
type Kind = typeof Kinds[number];

interface WhatToDoState {
    selectedKind: Kind,
    selection?: Inspiration | PracticeExercise | LearningResource,
}

export const WhatToDoForm = (props: {
    inspirations: Inspiration[],
    practiceExercises: PracticeExercise[],
    leaningResources: LearningResource[],
    handleSubmit: (selection: Inspiration | PracticeExercise | LearningResource) => void,
}) => {
    const [state, setState] = useState<WhatToDoState>({
        selectedKind: "Inspiration",
    })

    const handleKindChange = useCallback((event: SelectChangeEvent<Kind>) => {
        const kind = event.target.value;
        setState({
            selectedKind: kind as Kind,
        })
    }, [])

    const handleSelectionChange = useCallback((_: any, value: Inspiration | PracticeExercise | LearningResource) => {
        setState(Object.assign({}, state, {
            selection: value
        }));
    }, [state])

    const handleSubmit = useCallback(() => {
        props.handleSubmit(state.selection!)
    }, [state])

    const selectOptions = useMemo(() => {
        switch (state.selectedKind) {
            case "Inspiration":
                return props.inspirations;
            case "Practice Exercise":
                return props.practiceExercises;
            case "Learning Resource":
                return props.leaningResources;
        }
    }, [state.selectedKind])

    return (
        <Box sx={{ width: '100%' }}>
            <Container>
                <FormControl fullWidth>
                    <InputLabel>Kind</InputLabel>
                    <Select
                        value={state.selectedKind}
                        label="Kind"
                        fullWidth
                        onChange={handleKindChange}>
                        <MenuItem value={Kinds[0]}>{Kinds[0]}</MenuItem>
                        <MenuItem value={Kinds[1]}>{Kinds[1]}</MenuItem>
                        <MenuItem value={Kinds[2]}>{Kinds[2]}</MenuItem>
                    </Select>
                </FormControl>
                <Box
                    component="form"
                    sx={{ mt: 1 }}>
                    <Autocomplete
                        sx={{ mt: 1 }}
                        fullWidth
                        options={selectOptions}
                        value={state.selection}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        onChange={handleSelectionChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selection"
                                placeholder="Select" />
                        )} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button disabled={!state.selection} onClick={handleSubmit}>Submit</Button>
                </Box>
            </Container>
        </Box>
    );
}