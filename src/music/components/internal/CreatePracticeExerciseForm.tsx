import { Container, IconButton, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { useStateWithPartialUpdater } from 'src/common/react_util';
import { Instrument, Instruments, PracticeExercise } from 'src/music/resource_access/practice_exercise/practice_exercise';


interface CreatPracticeExerciseState {
  name: string,
  selectedInstrument: Instrument,
  source: string,
}

export const CreatePracticeExerciseForm = (props: {
  defaultPracticeExercise?: PracticeExercise,
  defaultSource?: string,
  handleSubmit: (practiceExercise: PracticeExercise) => void,
}) => {
  const [practiceExerciseState, setPracticeExerciseState] = useStateWithPartialUpdater<CreatPracticeExerciseState>({
    name: props.defaultPracticeExercise?.name || '',
    selectedInstrument: props.defaultPracticeExercise?.instrument || Instruments[0],
    source: props.defaultPracticeExercise?.source || props.defaultSource || '',
  });

  const handleSubmit = () => props.handleSubmit(
      new PracticeExercise(
        practiceExerciseState.name,
        practiceExerciseState.selectedInstrument!,
        practiceExerciseState.source,
      ));

  const handlePracticeExerciseNameChange = (event: ChangeEvent<HTMLInputElement>) => setPracticeExerciseState({
    name: event.target.value
  });

  const handleSourceChanged = (event: ChangeEvent<HTMLInputElement>) => setPracticeExerciseState({
    source: event.target.value
  });

  const handleInstrumentChanged = (event: SelectChangeEvent<Instrument>) => setPracticeExerciseState({
    selectedInstrument: event.target.value as Instrument
  });

  return <Box sx={{ width: '100%' }}>
    <Container>
      <Box
        component="form"
        sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          value={practiceExerciseState.name}
          onChange={handlePracticeExerciseNameChange}
          sx={{ mt: 1 }}
          label="PracticeExercise Name"
          name="name"
          autoFocus />
        <Select
          label="PracticeExercise Kind"
          sx={{ mt: 1 }}
          fullWidth
          value={practiceExerciseState.selectedInstrument}
          onChange={handleInstrumentChanged}>
          {Instruments.map(instrument => <MenuItem key={instrument} value={instrument}>{instrument}</MenuItem>)}
        </Select>
        <TextField
          required
          fullWidth
          type='text'
          value={practiceExerciseState.source}
          onChange={handleSourceChanged}
          sx={{ mt: 1 }}
          label="PracticeExercise Source"
          name="name" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={practiceExerciseState.name === ''} onClick={handleSubmit}>Submit</Button>
      </Box>
    </Container>
  </Box>;
}
