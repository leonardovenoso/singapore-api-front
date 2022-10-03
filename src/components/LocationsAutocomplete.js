import { Fragment, useState } from 'react';
import { Autocomplete, TextField, Grid, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';

const LocationsAutocomplete = ({ locations, isLocationsLoading }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOnChange = (e, loc) => loc && dispatch.FrontPageModel.setSelectedLocation(loc);

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
        options={locations}
        loading={isLocationsLoading}
        onChange={handleOnChange}
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