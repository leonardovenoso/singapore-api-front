import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
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
      <Grid item xs={12} md={8}>
        {selectedLocation && selectedLocation.image && selectedLocation.forecast &&
          <CustomBox>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='140'
                  image={selectedLocation.image}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' data-testid='locationName'>
                    Area: {selectedLocation.locationName}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' data-testid='cameraId'>
                    Camera id: {selectedLocation.cameraId}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' data-testid='weather'>
                    Weather&nbsp; <img src={getTheWeatherIcon(selectedLocation?.forecast)} />
                  </Typography>
                  <Typography variant='body2' color='text.secondary' data-testid='coordinates'>
                    Coordinates: ({selectedLocation.lat}, {selectedLocation.lon})
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </CustomBox>
        }
      </Grid>
    </Grid>
  );
};
