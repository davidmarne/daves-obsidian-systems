import { Container, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { useStateWithPartialUpdater } from 'src/common/react_util';
import { LearningResourceKind, LearningResourceKinds, LearningResource } from 'src/music/resource_access/learning_resource/learning_resource';


interface CreatLearningResourceState {
  name: string,
  selectedKind: LearningResourceKind,
  source: string,
}

export const CreateLearningResourceForm = (props: {
  defaultLearningResource?: LearningResource,
  defaultSource?: string,
  handleSubmit: (practiceExercise: LearningResource) => void,
}) => {
  const [learningResourceState, setLearningResourceState] = useStateWithPartialUpdater<CreatLearningResourceState>({
    name: props.defaultLearningResource?.name || '',
    selectedKind: props.defaultLearningResource?.kind || LearningResourceKinds[0],
    source: props.defaultLearningResource?.source || props.defaultSource || '',
  });

  const handleSubmit = () => props.handleSubmit(
      new LearningResource(
        learningResourceState.name,
        learningResourceState.selectedKind,
        learningResourceState.source,
      ));

  const handleLearningResourceNameChange = (event: ChangeEvent<HTMLInputElement>) => setLearningResourceState({
    name: event.target.value
  });

  const handleSourceChanged = (event: ChangeEvent<HTMLInputElement>) => setLearningResourceState({
    source: event.target.value
  });

  const handleLearningResourceKindChanged = (event: SelectChangeEvent<LearningResourceKind>) => setLearningResourceState({
    selectedKind: event.target.value as LearningResourceKind
  });

  return <Box sx={{ width: '100%' }}>
    <Container>
      <Box
        component="form"
        sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          value={learningResourceState.name}
          onChange={handleLearningResourceNameChange}
          sx={{ mt: 1 }}
          label="LearningResource Name"
          name="name"
          autoFocus />
        <Select
          label="LearningResource Kind"
          sx={{ mt: 1 }}
          fullWidth
          value={learningResourceState.selectedKind}
          onChange={handleLearningResourceKindChanged}>
          {LearningResourceKinds.map(instrument => <MenuItem key={instrument} value={instrument}>{instrument}</MenuItem>)}
        </Select>
        <TextField
          required
          fullWidth
          type='text'
          value={learningResourceState.source}
          onChange={handleSourceChanged}
          sx={{ mt: 1 }}
          label="LearningResource Source"
          name="name" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={learningResourceState.name === ''} onClick={handleSubmit}>Submit</Button>
      </Box>
    </Container>
  </Box>;
}
