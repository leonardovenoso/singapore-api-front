const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getLocationName = (location, weathers) => {
  const distances = weathers.map(weather => {
    const lat1 = weather.label_location.latitude;
    const lon1 = weather.label_location.longitude;
    const lat2 = location.location.latitude;
    const lon2 = location.location.longitude;

    return {
      distanceInMeters: getDistanceInMeters(lat1, lon1, lat2, lon2),
      locationName: weather.name,
      forecast: weather.forecast,
    };
  });

  const sortedDistances = distances.sort((a, b) =>
    (a.distanceInMeters > b.distanceInMeters) ? 1 : ((b.distanceInMeters > a.distanceInMeters) ? -1 : 0));

  return sortedDistances[0].locationName;
};

const getForecastByLocationName = (locationName, forecasts) => (
  forecasts.find(forecast => forecast.area === locationName)
);

const getLocationInformation = (locations, weathers) => (locations.map(location => {
  const locationName = getLocationName(location, weathers.area_metadata);
  const { forecast } = getForecastByLocationName(locationName, weathers.items[0].forecasts);
  return {
    lat: location.location.latitude,
    lon: location.location.longitude,
    image: location.image,
    cameraId: location.camera_id,
    forecast,
    locationName,
  };
}));

export default getLocationInformation;