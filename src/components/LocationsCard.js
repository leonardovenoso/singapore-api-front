import { getTheWeatherIcon } from '../utils/icons';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

const LocationsCard = ({ selectedLocation, onClickCardImage }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={selectedLocation.image}
          onClick={onClickCardImage}
          data-testid='locationImage'
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
);

export default LocationsCard;