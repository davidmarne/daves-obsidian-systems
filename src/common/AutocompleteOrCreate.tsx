import * as React from 'react';
import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';


export const AutocompleteOrCreate = (props: {
  label: string;
  options: string[];
  selected: string;
  onChange: (selected: string | null) => void;
}) => {

  const [autocompleteInputValue, setAutocompleteInputValue] = useState<string>('');

  let options = !props.options.contains(autocompleteInputValue)
    ? [autocompleteInputValue, ...props.options]
    : props.options;

  options = !props.options.contains(props.selected)
    ? [props.selected, ...props.options]
    : props.options;

  return <Autocomplete
    sx={{ mt: 1 }}
    options={options}
    inputValue={autocompleteInputValue}
    value={props.selected}
    getOptionLabel={(option) => option}
    filterSelectedOptions
    onInputChange={(_, value) => setAutocompleteInputValue(value)}
    onChange={(_, value) => props.onChange(value)}
    renderInput={(params) => <TextField
      {...params}
      placeholder="Select" />} />;
};
