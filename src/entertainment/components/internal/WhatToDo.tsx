import { Container, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';
import { useMemo } from 'react';
import { PartialUpdater, useStateWithPartialUpdater } from 'src/common/react_util';
import { EntertainmentContent, EntertainmentContentKind, EntertainmentContentKinds } from 'src/entertainment/resource_access/entertainment_content/entertainment_content';

const steps = ['Select Criteria', 'Select EntertainmentContent'] as const;

interface WhatToDoState {
    activeStep: number,
    selectedEntertainmentContentKinds: Set<EntertainmentContentKind>,
    selection: EntertainmentContent | null
}

const calculateMatchingEntertainmentContents = (entertainmentContents: EntertainmentContent[], selectedEntertainmentContentKinds: Set<EntertainmentContentKind>) => {
    const matching = new Set<EntertainmentContent>();
    for (const entertainmentContent of entertainmentContents) {
        if (selectedEntertainmentContentKinds.has(entertainmentContent.kind)) {
            matching.add(entertainmentContent);
        }
    }
    return matching;
}


export const WhatToDoForm = (props: {
    entertainmentContents: EntertainmentContent[],
    handleSubmit: (selection: EntertainmentContent) => void,
}) => {

    const [whereToEatState, setWhatToDoState] = useStateWithPartialUpdater<WhatToDoState>({
        activeStep: 0,
        selectedEntertainmentContentKinds: new Set(),
        selection: null,
    });

    const entertainmentContentsWithSelectedKinds = useMemo(
        () => calculateMatchingEntertainmentContents(props.entertainmentContents, whereToEatState.selectedEntertainmentContentKinds),
        [whereToEatState.selectedEntertainmentContentKinds]);


    const handleNext = () => setWhatToDoState({
        activeStep: whereToEatState.activeStep + 1,
    });

    const handleBack = () => setWhatToDoState({
        activeStep: whereToEatState.activeStep - 1,
    });

    const handleSubmit = () => {
        props.handleSubmit(whereToEatState.selection!)
    };

    let content: React.ReactElement;
    if (whereToEatState.activeStep === 0) {
        content = <SelectEntertainmentContentCriteriaContent
            whereToEatState={whereToEatState}
            setWhatToDoState={setWhatToDoState} />
    } else {
        content = <SelectEntertainmentContentsContent
            entertainmentContents={entertainmentContentsWithSelectedKinds}
            whereToEatState={whereToEatState}
            setWhatToDoState={setWhatToDoState} />
    }

    const activeStep = whereToEatState.activeStep;
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
                        ? <Button disabled={!whereToEatState.selection} onClick={handleSubmit}>Finish</Button>
                        : <Button onClick={handleNext}>Next</Button>
                    }
                </Box>
            </Container>
        </Box>
    );
}

const SelectEntertainmentContentCriteriaContent = (props: {
    whereToEatState: WhatToDoState,
    setWhatToDoState: PartialUpdater<WhatToDoState>
}) => {
    const handleKindChange = (event: SelectChangeEvent<EntertainmentContentKind[]>) => props.setWhatToDoState({
        selectedEntertainmentContentKinds: new Set(event.target.value as EntertainmentContentKind[]),
    });

    return <Select
        label="Kinds"
        sx={{ mt: 1 }}
        fullWidth
        multiple
        value={[...props.whereToEatState.selectedEntertainmentContentKinds]}
        onChange={handleKindChange}>
        {EntertainmentContentKinds.map(kind => <MenuItem key={kind} value={kind}>{kind}</MenuItem>)}
    </Select>;
}


const SelectEntertainmentContentsContent = (props: {
    entertainmentContents: Set<EntertainmentContent>,
    whereToEatState: WhatToDoState,
    setWhatToDoState: PartialUpdater<WhatToDoState>
}) => {
    const lookup: {[key: string]: EntertainmentContent} = {};
    for (const v of props.entertainmentContents) {
        lookup[v.name] = v;
    }

    const handleEntertainmentContentsChange = (event: SelectChangeEvent<string>) => props.setWhatToDoState({
        selection: lookup[event.target.value],
    });

    return <Select
        label="Kinds"
        sx={{ mt: 1 }}
        fullWidth
        value={props.whereToEatState.selection?.name || ''}
        onChange={handleEntertainmentContentsChange}>
        {Object.keys(lookup).map(content => <MenuItem
            key={content}
            value={content}>
            {content}
        </MenuItem>)}
    </Select>;
}
