import getLocationInformation from '../utils/haversine';
import { fetchTraffic } from '../api/apiTraffic';
import { fetchWeather } from '../api/apiWeather';

export const FrontPageModel = {
  state: {
    time: '',
    locations: [],
    isLocationsLoading: false,
    selectedLocation: undefined,
  },
  reducers: {
    setTime(state, time) {
      return {...state, time};
    },
    setLocations(state, locations) {
      return {...state, locations};
    },
    setIsLocationsLoading(state, isLocationsLoading) {
      return {...state, isLocationsLoading};
    },
    setSelectedLocation(state, selectedLocation) {
      return {...state, selectedLocation};
    },
  },
  effects: {
    async fetchLocationsAndWeather(time) {
      this.setIsLocationsLoading(true);      
      const all = await Promise.all([fetchTraffic(time), fetchWeather(time)]);
      const locations = all.shift();
      const weather = all.shift();
      this.setLocations(getLocationInformation(locations.items[0].cameras, weather));
      this.setIsLocationsLoading(false);
    },
  },
};
