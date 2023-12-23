import * as React from 'react';
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

export const AutocompleteOrCreateMulti = (props: {
  label: string,
  options: string[],
  selected: string[],
  onChange: (selected: string[]) => void
}) => {

  const [autocompleteInputValue, setAutocompleteInputValue] = useState<string | undefined>(undefined);
  
  const options = autocompleteInputValue
    ? [autocompleteInputValue, ...props.options]
    : props.options;

  return <Autocomplete
    sx={{ mt: 1 }}
    options={options}
    multiple
    inputValue={autocompleteInputValue}
    value={props.selected}
    getOptionLabel={(option) => option}
    filterSelectedOptions
    onInputChange={(_, value) => setAutocompleteInputValue(value)}
    onChange={(_, value) => props.onChange(value)}
    renderInput={(params) =>
        <TextField
            {...params}
            variant='standard'
            placeholder="Select" />}
            />;
}