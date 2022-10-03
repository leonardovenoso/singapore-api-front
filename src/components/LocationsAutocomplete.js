import { Fragment, useState, useEffect } from 'react';
import { Autocomplete, TextField, Grid, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const LocationsAutocomplete = ({ locations, isLocationsLoading }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const getLabel = (option) => option ? `${option.locationName}, (${option.lat}, ${option.lon})` : '';

  const handleOnChange = (e, loc) => {
    dispatch.FrontPageModel.setSelectedLocation(loc);
    setInputValue(getLabel(loc));
  };
  const time = useSelector(state => state.FrontPageModel.time);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
  }, [time]);

  return (
    <Grid item xs={12} md={12}>
      <Autocomplete
        disabled={!locations || locations.length === 0}
        id='locations-autocomplete'
        data-testid='locations-autocomplete'
        sx={{width: '100%'}}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        getOptionLabel={(option) => `${option.locationName}, (${option.lat}, ${option.lon})`}
        isOptionEqualToValue={(option, value) => getLabel(option) === getLabel(value)}
        options={locations}
        loading={isLocationsLoading}
        onChange={handleOnChange}
        inputValue={inputValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Locations'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {isLocationsLoading && <CircularProgress color='inherit' size={20} />}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}            
          />
        )}
      />
    </Grid>
  );
};

export default LocationsAutocomplete;