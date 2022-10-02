export const FrontPageModel = {
  state: {
    time: '',
    locations: [],
    isLocationsLoading: false,
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
  },
  effects: {
  },
};
