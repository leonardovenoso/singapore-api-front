import getLocationInformation from '../utils/haversine';
import { fetchTraffic } from '../api/apiTraffic';
import { fetchWeather } from '../api/apiWeather';

export const FrontPageModel = {
  state: {
    time: '',
    locations: [],
    isLocationsLoading: false,
    selectedLocation: undefined,
    showError: false,
  },
  reducers: {
    setTime(state, time) {
      return {...state, time, selectedLocation: {}};
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
    setShowError(state, showError) {
      return {...state, showError};
    },
    setPayload(state, payload) {
      return {...state, ...payload};
    },
  },
  effects: {
    async fetchLocationsAndWeather(time) {
      try {
        this.setIsLocationsLoading(true);      
        const all = await Promise.all([fetchTraffic(time), fetchWeather(time)]);
        const locations = all.shift();
        const weather = all.shift();
        this.setLocations(getLocationInformation(locations.items[0].cameras, weather));
        this.setIsLocationsLoading(false);
      } catch (e) {
        this.setPayload({showError: true, isLocationsLoading: false, locations: [], selectedLocation: {}});
      }
    },
  },
};
