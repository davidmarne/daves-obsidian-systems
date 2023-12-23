import { Autocomplete, Container, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { withPartial } from 'src/common/react_util';
import { Cuisine } from 'src/systems/eating/resource_access/cuisine';
import { Restaurant, RestaurantDistance, RestaurantDistances, RestaurantPrice, RestaurantPrices } from 'src/systems/eating/resource_access/restaurant';

const steps = ['Select Criteria', 'Select Restaurant'] as const;

interface WhereToEatState {
    activeStep: number,
    selectedPrice: RestaurantPrice,
    selectedDistance: RestaurantDistance,
    selectedCuisines: Cuisine[],
    selectedRestaurant?: Restaurant
}

const calculateRestaurantRankings = (restaurants: Restaurant[], selectedCuisines: { [key: string]: boolean }) => {
    const rankings: { [key: string]: boolean } = {}
    for (const restaurant of restaurants) {
        for (const cuisine of restaurant.cuisines) {
            if (selectedCuisines[cuisine]) {
                rankings[restaurant.name] = true;
            }
        }
    }
    return rankings;
}


export const WhereToEatForm = (props: {
    cuisines: Cuisine[],
    restaurants: Restaurant[],
    handleSubmit: (restaurant: Restaurant) => void,
}) => {

    const [whereToEatState, setWhereToEatState] = useState<WhereToEatState>({
        activeStep: 0,
        selectedPrice: '$$',
        selectedDistance: '🚶🏻',
        selectedCuisines: [],
        selectedRestaurant: undefined,
    });

    const cuisineLookup = useMemo(() => {
        const lookup: { [key: string]: boolean } = {};
        for (const cuisine of whereToEatState.selectedCuisines) {
            lookup[cuisine.name] = true;
        }
        return lookup;
    }, [whereToEatState.selectedCuisines]);


    const restaurantsWithSelectedCuisines = useMemo(
        () => calculateRestaurantRankings(props.restaurants, cuisineLookup),
        [cuisineLookup]);

    const restaurantLookup = useMemo(() => {
        const lookup: { [key: string]: Restaurant } = {};
        for (const restaurant of props.restaurants) {
            lookup[restaurant.name] = restaurant;
        }
        return lookup;
    }, [])

    const handleNext = useCallback(() => {
        setWhereToEatState(withPartial(whereToEatState, {
            activeStep: whereToEatState.activeStep + 1,
        }));
    }, [whereToEatState])

    const handleBack = useCallback(() => {
        setWhereToEatState(withPartial(whereToEatState, {
            activeStep: whereToEatState.activeStep - 1,
        }));
    }, [whereToEatState])

    const handleSubmit = useCallback(() => {
        props.handleSubmit(whereToEatState.selectedRestaurant!)
    }, [props, whereToEatState])

    let content: React.ReactElement;
    if (whereToEatState.activeStep === 0) {
        content = <SelectRestaurantCriteriaContent
            cuisines={props.cuisines}
            whereToEatState={whereToEatState}
            setWhereToEatState={setWhereToEatState} />
    } else {
        content = <SelectRestaurantsContent
            restaurantLookup={restaurantLookup}
            restaurantsWithSelectedCuisines={restaurantsWithSelectedCuisines}
            whereToEatState={whereToEatState}
            setWhereToEatState={setWhereToEatState} />
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
                        ? <Button disabled={!whereToEatState.selectedRestaurant} onClick={handleSubmit}>Finish</Button>
                        : <Button onClick={handleNext}>Next</Button>
                    }
                </Box>
            </Container>
        </Box>
    );
}

const SelectRestaurantCriteriaContent = (props: {
    cuisines: Cuisine[],
    whereToEatState: WhereToEatState,
    setWhereToEatState: Dispatch<SetStateAction<WhereToEatState>>
}) => {
    const handlePriceChange = useCallback((event: SelectChangeEvent<RestaurantPrice>) => {
        props.setWhereToEatState(withPartial(props.whereToEatState, {
            selectedPrice: event.target.value as RestaurantPrice,
        }));
    }, [props.whereToEatState])

    const handleDistanceChange = useCallback((event: SelectChangeEvent<RestaurantDistance>) => {
        props.setWhereToEatState(withPartial(props.whereToEatState, {
            selectedDistance: event.target.value as RestaurantDistance,
        }));
    }, [props.whereToEatState])

    return <>
        <Select
            label="Max Price"
            sx={{ mt: 1 }}
            fullWidth
            value={props.whereToEatState.selectedPrice}
            onChange={handlePriceChange}>
            {RestaurantPrices.map(price => <MenuItem key={price} value={price}>{price}</MenuItem>)}
        </Select>
        <Select
            label="Max Distance"
            sx={{ mt: 1 }}
            fullWidth
            value={props.whereToEatState.selectedDistance}
            onChange={handleDistanceChange}>
            {RestaurantDistances.map(distance => <MenuItem key={distance} value={distance}>{distance}</MenuItem>)}
        </Select>
        <SelectCuisinesContent
            cuisines={props.cuisines}
            whereToEatState={props.whereToEatState}
            setWhereToEatState={props.setWhereToEatState}
        />
    </>;
}


const SelectRestaurantsContent = (props: {
    restaurantLookup: { [key: string]: Restaurant },
    restaurantsWithSelectedCuisines: { [key: string]: boolean },
    whereToEatState: WhereToEatState,
    setWhereToEatState: Dispatch<SetStateAction<WhereToEatState>>
}) => {
    const handleRestaurantsChange = useCallback((event: SelectChangeEvent<string>) => {
        props.setWhereToEatState(withPartial(props.whereToEatState, {
            selectedRestaurant: props.restaurantLookup[event.target.value],
        }));
    }, [props.whereToEatState])

    const restaurantsSorted = useMemo(() => {
        return Object.keys(props.restaurantsWithSelectedCuisines).sort();
    }, [props.restaurantsWithSelectedCuisines]);


    return <Select
        label="Kinds"
        sx={{ mt: 1 }}
        fullWidth
        value={props.whereToEatState.selectedRestaurant?.name}
        onChange={handleRestaurantsChange}>
        {restaurantsSorted.map(restaurant => <MenuItem
            key={restaurant}
            value={restaurant}>
            {restaurant}
        </MenuItem>)}
    </Select>;
}

const SelectCuisinesContent = (props: {
    cuisines: Cuisine[],
    whereToEatState: WhereToEatState,
    setWhereToEatState: Dispatch<SetStateAction<WhereToEatState>>
}) => {
    const { whereToEatState, setWhereToEatState } = props;


    let options: string[] = props.cuisines.map(it => it.name);

    const cuisineLookup = useMemo(() => {
        const lookup: { [key: string]: Cuisine } = {};
        for (const cuisine of props.cuisines) {
            lookup[cuisine.name] = cuisine;
        }
        return lookup;
    }, [])

    const handleCuisinesChange = useCallback((_: any, selected: string[]) => {
        setWhereToEatState(withPartial(whereToEatState, {
            selectedCuisines: selected.map(it => cuisineLookup[it] || it)
        }));
    }, [whereToEatState])

    return <Autocomplete
        multiple
        sx={{ mt: 1 }}
        fullWidth
        options={options}
        value={whereToEatState.selectedCuisines.map(it => it.name)}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        onChange={handleCuisinesChange}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Cuisine Name"
                placeholder="Favorites" />
        )} />;
};