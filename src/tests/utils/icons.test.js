import { getTheWeatherIcon } from '../../utils/icons';

describe('getTheWeatherIcon()', () => {
  it('transform from weather name to full icon URL', () => {
    expect(getTheWeatherIcon('Fair (Day)')).toEqual('http://www.weather.gov.sg/wp-content/themes/wiptheme/assets/img/icon-fair-day-small.png');
  });
});