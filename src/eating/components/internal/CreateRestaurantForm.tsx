import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback, useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Autocomplete, Container, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { RestaurantDistance, RestaurantPrice, Restaurant, RestaurantDistances, RestaurantPrices } from 'src/eating/resource_access/restaurant/restaurant';
import { Cuisine } from 'src/eating/resource_access/cuisine/cuisine';


interface CreatRestaurantState {
  name: string,
  distance: RestaurantDistance,
  price: RestaurantPrice,
  selectedCuisines: string[],
  cuisineAutoCompleteInput?: string,
}

export const CreateRestaurantForm = (props: {
  defaultRestaurant?: Restaurant,
  cuisines: Cuisine[],
  handleSubmit: (restaurant: Restaurant) => void,
}) => {
  const [restaurantState, setRestaurantState] = useState<CreatRestaurantState>({
    name: props.defaultRestaurant?.name || '',
    distance: props.defaultRestaurant?.distance || '🚗',
    price: props.defaultRestaurant?.price || '$',
    selectedCuisines: props.defaultRestaurant?.cuisines.map(it => it.name) || []
  });

  const handleSubmit = useCallback(() => {
    props.handleSubmit(
      new Restaurant(
        restaurantState.name!,
         restaurantState.distance,
         restaurantState.price,
         restaurantState.selectedCuisines.map(it => new Cuisine(it)),
         "TODO",
         [],
      ));
  }, [props, restaurantState])


  let cuisineNames = props.cuisines.map(it => it.name);
  if (restaurantState.cuisineAutoCompleteInput) {
    cuisineNames = [restaurantState.cuisineAutoCompleteInput, ...cuisineNames]
  }
  if (restaurantState.selectedCuisines) {
    cuisineNames = [...new Set([...cuisineNames, ...restaurantState.selectedCuisines])];
  }

  const handleRestaurantNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRestaurantState(Object.assign({}, restaurantState, {
      name: event.target.value
    }));
  }, [restaurantState]);

  const handleRestaurantDistanceChange = useCallback((event: SelectChangeEvent<string>) => {
    setRestaurantState(Object.assign({}, restaurantState, {
      distance: event.target.value
    }));
  }, [restaurantState]);

  const handleRestaurantPriceChange = useCallback((event: SelectChangeEvent<string>) => {
    setRestaurantState(Object.assign({}, restaurantState, {
      price: event.target.value
    }));
  }, [restaurantState]);


  const handleCuisineuggestionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRestaurantState(Object.assign({}, restaurantState, {
      cuisineAutoCompleteInput: event.target.value
    }));
  }, [restaurantState]);

  const handleCuisinesChange = useCallback((_: any, selected: string[]) => {
    setRestaurantState(Object.assign({}, restaurantState, {
      cuisineAutoCompleteInput: undefined,
      selectedCuisines: selected
    }));
  }, [restaurantState]);

  return <Box sx={{ width: '100%' }}>
      <Container>
        <Box
          component="form"
          sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            value={restaurantState.name}
            onChange={handleRestaurantNameChange}
            sx={{ mt: 1 }}
            label="Restaurant Name"
            name="name"
            autoFocus />
          <Select
            label="Distance"
            sx={{ mt: 1 }}
            fullWidth
            value={restaurantState.distance}
            onChange={handleRestaurantDistanceChange}>
            {RestaurantDistances.map(distance => <MenuItem key={distance} value={distance}>{distance}</MenuItem>)}
          </Select>
          <Select
            label="Price"
            sx={{ mt: 1 }}
            fullWidth
            value={restaurantState.price}
            onChange={handleRestaurantPriceChange}>
            {RestaurantPrices.map(price => <MenuItem key={price} value={price}>{price}</MenuItem>)}
          </Select>
          <Autocomplete
            multiple
            sx={{ mt: 1 }}
            fullWidth
            options={cuisineNames}
            value={restaurantState.selectedCuisines}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            onChange={handleCuisinesChange}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleCuisineuggestionChange}
                label="Cuisine Name"
                placeholder="Italian, Burger, Oysters etc." />
            )} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Container>
    </Box>;
}
