import { Fragment, useState } from 'react';
import { Autocomplete, TextField, Grid, CircularProgress } from '@mui/material';

const LocationsAutocomplete = ({ locations, isLocationsLoading }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12} md={12}>
      <Autocomplete
        id='locations-autocomplete'
        data-testid='locations-autocomplete'
        sx={{width: '100%'}}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        getOptionLabel={(option) => `${option.locationName}, (${option.lat}, ${option.lon})`}
        options={locations}
        loading={isLocationsLoading}
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