import { Autocomplete, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useStateWithPartialUpdater } from 'src/common/react_util';
import { Inspiration } from 'src/systems/music/resource_access/inspiration';
import { LearningResource } from 'src/systems/music/resource_access/learning_resource';
import { PracticeExercise } from 'src/systems/music/resource_access/practice_exercise';

const Kinds = [ "Inspiration", "Practice Exercise", "Learning Resource"] as const;
type Kind = typeof Kinds[number];

interface WhatToDoState {
    selectedKind: Kind,
    selection: Inspiration | PracticeExercise | LearningResource | null,
}

export const WhatToDoForm = (props: {
    inspirations: Inspiration[],
    practiceExercises: PracticeExercise[],
    leaningResources: LearningResource[],
    handleSubmit: (selection: Inspiration | PracticeExercise | LearningResource) => void,
}) => {
    const [state, setState] = useStateWithPartialUpdater<WhatToDoState>({
        selectedKind: "Inspiration",
        selection: props.inspirations.length > 0 ? props.inspirations[0] : null
    })

    const handleKindChange = (event: SelectChangeEvent<Kind>) => {
        const kind = event.target.value;
        setState({
            selectedKind: kind as Kind,
        })
    };

    const handleSelectionChange = (_: any, value: Inspiration | PracticeExercise | LearningResource) => {
        setState({selection: value});
    };

    const handleSubmit = () => {
        props.handleSubmit(state.selection!)
    };

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