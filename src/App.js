import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import CustomBox from './components/CustomBox';
import Time from './components/Time';
import LocationsAutocomplete from './components/LocationsAutocomplete';

export default function App() {
  const locations = useSelector(state => state.FrontPageModel.locations);
  const isLocationsLoading = useSelector(state => state.FrontPageModel.isLocationsLoading);
  const time = useSelector(state => state.FrontPageModel.time);
  const dispatch = useDispatch();

  useEffect(() => {
    if (time) {
      dispatch.FrontPageModel.fetchLocationsAndWeather(time);
    }
  }, [time]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <CustomBox>
          <Time />
        </CustomBox>
      </Grid>
      <Grid item xs={12} md={8}>
        <CustomBox>
          <LocationsAutocomplete locations={locations} isLocationsLoading={isLocationsLoading} />
        </CustomBox>
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomBox>
          <p>Weather</p>
        </CustomBox>
      </Grid>
    </Grid>
  );
};
