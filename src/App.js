import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import CustomBox from './components/CustomBox';
import Time from './components/Time';
import LocationsAutocomplete from './components/LocationsAutocomplete';
import { getTheWeatherIcon } from './utils/icons';

export default function App() {
  const locations = useSelector(state => state.FrontPageModel.locations);
  const isLocationsLoading = useSelector(state => state.FrontPageModel.isLocationsLoading);
  const time = useSelector(state => state.FrontPageModel.time);
  const selectedLocation = useSelector(state => state.FrontPageModel.selectedLocation);
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
        {selectedLocation?.forecast &&
          <CustomBox pl={'1px'}>
            <p data-testid='weather'>Weather&nbsp;</p>
            <p><img src={getTheWeatherIcon(selectedLocation?.forecast)} /></p>
          </CustomBox>
        }
      </Grid>
    </Grid>
  );
};
