import * as React from 'react';
import { Grid } from '@mui/material';
import CustomBox from './components/CustomBox';
import Time from './components/Time';

export default function App() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <CustomBox>
          <Time />
        </CustomBox>
      </Grid>
      <Grid item xs={12} md={8}>
        <CustomBox>
          <p>Locations</p>
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
