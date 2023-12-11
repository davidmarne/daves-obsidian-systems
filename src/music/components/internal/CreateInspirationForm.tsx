import { Autocomplete, Container, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { useStateWithPartialUpdater } from 'src/common/react_util';
import { Inspiration, InspirationKind, InspirationKinds } from 'src/music/resource_access/inspiration/inspiration';
import { Project } from 'src/music/resource_access/project/project';


interface CreateInspirationState {
  name: string,
  selectedKind: InspirationKind,
  source: string,
  selectedProjects: string[],
  projectAutoCompleteInput?: string,
  description: string,
}

export const CreateInspirationForm = (props: {
  defaultInspiration?: Inspiration,
  defaultSource?: string,
  projects: Project[],
  handleSubmit: (restaurant: Inspiration) => void,
}) => {
  const [inspirationState, setInspirationState] = useStateWithPartialUpdater<CreateInspirationState>({
    name: props.defaultInspiration?.name || '',
    selectedKind: props.defaultInspiration?.kind || InspirationKinds[0],
    selectedProjects: props.defaultInspiration?.projects.map(it => it.name) || [],
    source: props.defaultInspiration 
      ? props.defaultInspiration?.source || ''
      : props.defaultSource || '',
    description: props.defaultInspiration?.description || ''
  });

  const handleSubmit = () => props.handleSubmit(
      new Inspiration(
        inspirationState.name,
        inspirationState.selectedKind!,
        inspirationState.selectedProjects.map(it => new Project(it)),
        inspirationState.source,
        inspirationState.description,
      ));

  const handleInspirationNameChange = (event: ChangeEvent<HTMLInputElement>) => setInspirationState({
    name: event.target.value
  });

  const handleSourceChanged = (event: ChangeEvent<HTMLInputElement>) => setInspirationState({
    source: event.target.value
  });

  const handleInspirationKindChanged = (event: SelectChangeEvent<InspirationKind>) => setInspirationState({
    selectedKind: event.target.value as InspirationKind
  });

  const handleProjectSuggestionChange = (event: ChangeEvent<HTMLInputElement>) => setInspirationState({
    projectAutoCompleteInput: event.target.value
  });

  const handleProjectsChange = (_: any, selected: string[]) => setInspirationState({
    projectAutoCompleteInput: undefined,
    selectedProjects: selected
  });

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => setInspirationState({
    description: event.target.value
  });


  let projectNames = props.projects.map(it => it.name);
  if (inspirationState.projectAutoCompleteInput) {
    projectNames = [inspirationState.projectAutoCompleteInput, ...projectNames]
  }
  if (inspirationState.selectedProjects) {
    projectNames = [...new Set([...projectNames, ...inspirationState.selectedProjects])];
  }
  
  return <Box sx={{ width: '100%' }}>
    <Container>
      <Box
        component="form"
        sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          value={inspirationState.name}
          onChange={handleInspirationNameChange}
          sx={{ mt: 1 }}
          label="Inspiration Name"
          name="name"
          autoFocus />
        <Select
          label="Inspiration Kind"
          sx={{ mt: 1 }}
          fullWidth
          value={inspirationState.selectedKind}
          onChange={handleInspirationKindChanged}>
          {InspirationKinds.map(kind => <MenuItem key={kind} value={kind}>{kind}</MenuItem>)}
        </Select>
        <TextField
          required
          fullWidth
          type='url'
          value={inspirationState.source}
          onChange={handleSourceChanged}
          sx={{ mt: 1 }}
          label="Inspiration Source"
          name="name" />
        <Autocomplete
          multiple
          sx={{ mt: 1 }}
          fullWidth
          options={projectNames}
          value={inspirationState.selectedProjects}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          onChange={handleProjectsChange}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={handleProjectSuggestionChange}
              label="Project Name"
              placeholder="Project Name" />
          )} />
        <TextField
          required
          fullWidth
          multiline
          value={inspirationState.description}
          onChange={handleDescriptionChange}
          sx={{ mt: 1 }}
          label="Description"
          name="description" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={inspirationState.name === ''} onClick={handleSubmit}>Submit</Button>
      </Box>
    </Container>
  </Box>;
}
