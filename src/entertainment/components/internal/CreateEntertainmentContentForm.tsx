import { Autocomplete, Container, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { useStateWithPartialUpdater } from 'src/common/react_util';
import { EntertainmentContentKind, EntertainmentContent, EntertainmentContentKinds, EntertainmentContentState, EntertainmentContentStates, newEntertainmentContentStateValue } from 'src/entertainment/resource_access/entertainment_content/entertainment_content';
import { Project } from 'src/music/resource_access/project/project';


interface CreateEntertainmentContentState {
  name: string,
  selectedKind: EntertainmentContentKind,
  selectedState: EntertainmentContentState,
}

export const CreateEntertainmentContentForm = (props: {
  handleSubmit: (restaurant: EntertainmentContent) => void,
}) => {
  const [entertainementContentState, setEntertainmentContentState] = useStateWithPartialUpdater<CreateEntertainmentContentState>({
    name: '',
    selectedKind: EntertainmentContentKinds[0],
    selectedState: EntertainmentContentStates[0],
  });

  const handleSubmit = () => props.handleSubmit(
      new EntertainmentContent(
        entertainementContentState.name,
        entertainementContentState.selectedKind,
        newEntertainmentContentStateValue(entertainementContentState.selectedState)
      ));

  const handleEntertainmentContentNameChange = (event: ChangeEvent<HTMLInputElement>) => setEntertainmentContentState({
    name: event.target.value
  });

  const handleEntertainmentContentKindChanged = (event: SelectChangeEvent<EntertainmentContentKind>) => setEntertainmentContentState({
    selectedKind: event.target.value as EntertainmentContentKind
  });

 
  const handleEntertainmentContentStateChanged = (event: SelectChangeEvent<EntertainmentContentState>) => setEntertainmentContentState({
    selectedState: event.target.value as EntertainmentContentState
  });


  return <Box sx={{ width: '100%' }}>
    <Container>
      <Box
        component="form"
        sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          value={entertainementContentState.name}
          onChange={handleEntertainmentContentNameChange}
          sx={{ mt: 1 }}
          label="EntertainmentContent Name"
          name="name"
          autoFocus />
        <Select
          label="EntertainmentContent Kind"
          sx={{ mt: 1 }}
          fullWidth
          value={entertainementContentState.selectedKind}
          onChange={handleEntertainmentContentKindChanged}>
          {EntertainmentContentKinds.map(kind => <MenuItem key={kind} value={kind}>{kind}</MenuItem>)}
        </Select>
        <Select
          label="EntertainmentContent State"
          sx={{ mt: 1 }}
          fullWidth
          value={entertainementContentState.selectedState}
          onChange={handleEntertainmentContentStateChanged}>
          {EntertainmentContentStates.map(state => <MenuItem key={state} value={state}>{state}</MenuItem>)}
        </Select>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={entertainementContentState.name === ''} onClick={handleSubmit}>Submit</Button>
      </Box>
    </Container>
  </Box>;
}
