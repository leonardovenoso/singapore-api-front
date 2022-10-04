import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, AppBar, Toolbar, Typography, Alert } from '@mui/material';
import CustomBox from './components/CustomBox';
import Time from './components/Time';
import LocationsAutocomplete from './components/LocationsAutocomplete';
import LocationsCard from './components/LocationsCard';
import ImageModal from './components/ImageModal';

export default function App() {
  const locations = useSelector(state => state.FrontPageModel.locations);
  const isLocationsLoading = useSelector(state => state.FrontPageModel.isLocationsLoading);
  const time = useSelector(state => state.FrontPageModel.time);
  const selectedLocation = useSelector(state => state.FrontPageModel.selectedLocation);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showError = useSelector(state => state.FrontPageModel.showError);

  useEffect(() => {
    if (time) {
      dispatch.FrontPageModel.fetchLocationsAndWeather(time);
      dispatch.FrontPageModel.setShowError(false);
    }
  }, [time]);
  const onClickCardImage = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      {showError &&
        <Alert severity="error" data-testid='alertError'>There was an error, please try later!</Alert>
      }
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">SG API</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={5} mt={1}>
        <Grid item xs={12} md={12}>
          <CustomBox>
            <Time />
          </CustomBox>
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomBox>
            <LocationsAutocomplete locations={locations} isLocationsLoading={isLocationsLoading} />
          </CustomBox>
        </Grid>
        <Grid item xs={12} md={12}>
          {selectedLocation && selectedLocation.image &&
            <CustomBox>
              <LocationsCard selectedLocation={selectedLocation} onClickCardImage={onClickCardImage} />
              <ImageModal image={selectedLocation.image } isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
            </CustomBox>
          }
        </Grid>
      </Grid>
    </div>
  );
};
