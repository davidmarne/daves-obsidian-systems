import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback, useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Autocomplete, Container, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { RestaurantDistance, RestaurantPrice, Restaurant, RestaurantDistances, RestaurantPrices, RestaurantLog } from 'src/eating/resource_access/restaurant/restaurant';
import { Cuisine } from 'src/eating/resource_access/cuisine/cuisine';
import { SetRestaurantLogForm } from './SetRestaurantLogForm';
import { AutocompleteOrCreate } from '../../../../common/AutocompleteOrCreate';
import { AutocompleteOrCreateMulti } from 'src/common/AutocompleteOrCreateMulti';
import { useStateWithPartialUpdater } from 'src/common/react_util';
import { GenericForm, dateColumn, multiSelectOrCreate, multilineStringFormElement, numberColumn, selectFormElement, stringFormElement, tableFormElement, textColumn } from 'src/common/generic_forms';
import moment from 'moment';
import { Reference } from 'src/travel/resource_access/location';


// interface CreatRestaurantState {
//   name: string,
//   distance: RestaurantDistance,
//   price: RestaurantPrice,
//   selectedCuisines: string[],
//   cuisineAutoCompleteInput?: string,
// }

const defaultRestaurant = new Restaurant('', '🚗', '$', [], '', []);

const defaultLog = (): RestaurantLog => {
  return {
    date: moment(),
    dish: '',
    rating: 0,
    notes: '',
  }
}

export const EditRestaurant = (props: {
  restaurant?: Restaurant,
  cuisines: Cuisine[],
  handleSubmit: (restaurant: Restaurant) => void,
}) => {
  console.log("props.restaurant", props.restaurant)
  return <GenericForm 
     defaultState={props.restaurant || defaultRestaurant}
    config={{
      name: stringFormElement,
      distance: selectFormElement(RestaurantDistances),
      price: selectFormElement(RestaurantPrices),
      cuisines: multiSelectOrCreate(props.cuisines.map(it => it.name)),
      description: multilineStringFormElement,
      log: tableFormElement(
        defaultLog,
        {
          date: dateColumn(),
          dish: textColumn(),
          rating: numberColumn(),
          notes: textColumn(),
        }
      ),
      directory: null,
      path: null,
      link: null,
      tableLink: null
    }}
    onChange={props.handleSubmit}
  />;
}

export const CreateRestaurantForm = (props: {
  defaultRestaurant?: Restaurant,
  cuisines: Cuisine[],
  handleSubmit: (restaurant: Restaurant) => void,
}) => {
  const [restaurantState, setRestaurantState] = useStateWithPartialUpdater<Restaurant>(props.defaultRestaurant || defaultRestaurant);

  const handleSubmit = useCallback(() => {
    props.handleSubmit(restaurantState);
  }, [props, restaurantState])


  const handleRestaurantNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRestaurantState({
      name: event.target.value
    });
  }, [restaurantState]);

  const handleRestaurantDistanceChange = useCallback((event: SelectChangeEvent<string>) => {
    setRestaurantState({
      distance: event.target.value as RestaurantDistance
    });
  }, [restaurantState]);

  const handleRestaurantPriceChange = useCallback((event: SelectChangeEvent<string>) => {
    setRestaurantState({
      price: event.target.value as RestaurantPrice
    });
  }, [restaurantState]);

  const handleCuisinesChange = useCallback((selected: string[]) => {
    setRestaurantState({
      cuisines: selected
    });
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
          <AutocompleteOrCreateMulti
            options={props.cuisines.map(it => it.name)}
            selected={restaurantState.cuisines}
            onChange={handleCuisinesChange}
            label='Cuisines' />
          <SetRestaurantLogForm 
            restaurantState={restaurantState}
            setRestaurantState={setRestaurantState} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Container>
    </Box>;
}
