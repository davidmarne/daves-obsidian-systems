import { Autocomplete, Container, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { MarkdownString } from 'src/common/ast';
import { useStateWithPartialUpdater } from 'src/common/react_util';
import { EntertainmentContentKind, EntertainmentContent, EntertainmentContentKinds, EntertainmentContentState, EntertainmentContentStates, EntertainmentContentAnticipation, EntertainmentContentAnticipations } from 'src/systems/entertainment/resource_access/entertainment_content';


interface CreateEntertainmentContentState {
  name: string,
  selectedKind: EntertainmentContentKind,
  selectedAnticipation: EntertainmentContentAnticipation,
  selectedState: EntertainmentContentState,
  rating: number,
  description: string,
}

export const CreateEntertainmentContentForm = (props: {
  defaultEntertainmentContent?: EntertainmentContent,
  handleSubmit: (restaurant: EntertainmentContent) => void,
}) => {
  const [entertainementContentState, setEntertainmentContentState] = useStateWithPartialUpdater<CreateEntertainmentContentState>({
    name: props.defaultEntertainmentContent?.name || '',
    selectedAnticipation: props.defaultEntertainmentContent?.anticipation || EntertainmentContentAnticipations[0],
    selectedKind: props.defaultEntertainmentContent?.kind || EntertainmentContentKinds[0],
    selectedState: props.defaultEntertainmentContent?.state || EntertainmentContentStates[0],
    rating: props.defaultEntertainmentContent?.rating || 0,
    description: props.defaultEntertainmentContent?.description || '',
  });

  const handleSubmit = () => props.handleSubmit({
        directory: 'entertainment/entertainment_content/',
        name: entertainementContentState.name,
        kind: entertainementContentState.selectedKind,
        state: entertainementContentState.selectedState,
        anticipation: entertainementContentState.selectedAnticipation,
        rating: entertainementContentState.rating,
        description: entertainementContentState.description,
  });
      
  const handleEntertainmentContentNameChange = (event: ChangeEvent<HTMLInputElement>) => setEntertainmentContentState({
    name: event.target.value
  });

  const handleEntertainmentContentKindChanged = (event: SelectChangeEvent<EntertainmentContentKind>) => setEntertainmentContentState({
    selectedKind: event.target.value as EntertainmentContentKind
  });

  const handleEntertainmentContentAnticipationChanged = (event: SelectChangeEvent<EntertainmentContentAnticipation>) => setEntertainmentContentState({
    selectedAnticipation: event.target.value as EntertainmentContentAnticipation
  });

 
  const handleEntertainmentContentStateChanged = (event: SelectChangeEvent<EntertainmentContentState>) => setEntertainmentContentState({
    selectedState: event.target.value as EntertainmentContentState
  });

  const handleEntertainmentContentRatingChange = (event: ChangeEvent<HTMLInputElement>) => setEntertainmentContentState({
    rating: +event.target.value
  });

  const handleEntertainmentContentDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => setEntertainmentContentState({
    description: event.target.value
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
        <Select
          label="EntertainmentContent Anticipation"
          sx={{ mt: 1 }}
          fullWidth
          value={entertainementContentState.selectedAnticipation}
          onChange={handleEntertainmentContentAnticipationChanged}>
          {EntertainmentContentAnticipations.map(anticipation => <MenuItem key={anticipation} value={anticipation}>{anticipation}</MenuItem>)}
        </Select>
        <TextField
          required
          fullWidth
          type='number'
          value={entertainementContentState.rating}
          onChange={handleEntertainmentContentRatingChange}
          sx={{ mt: 1 }}
          label="EntertainmentContent Rating"
          name="name" />
          <TextField
          required
          fullWidth
          multiline
          value={entertainementContentState.description}
          onChange={handleEntertainmentContentDescriptionChange}
          sx={{ mt: 1 }}
          label="EntertainmentContent Description"
          name="description" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={entertainementContentState.name === ''} onClick={handleSubmit}>Submit</Button>
      </Box>
    </Container>
  </Box>;
}
