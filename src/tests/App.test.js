import { Provider } from 'react-redux';
import store from '../rematch/store';
import { render, fireEvent, within, waitFor } from '@testing-library/react/pure';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import App from '../App';
import * as apiTraffic from '../api/apiTraffic';
import { trafficItems } from './trafficData';

describe('App', () => {
  describe('when change time', () => {
    let container;
    let locationsInput;

    beforeAll(async () => {
      jest.spyOn(apiTraffic, 'fetchTraffic').mockResolvedValue(trafficItems);
      container = render(
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <App />
          </LocalizationProvider>
        </Provider>
      );

      const input = container.getByRole('textbox');
      fireEvent.change(input, {target: {value: '2022-10-01 02:00'}});
      fireEvent.keyDown(input, { key: 'Enter' });

      const autocomplete = container.getByTestId('locations-autocomplete');
      locationsInput = within(autocomplete).getByRole('combobox');
      await waitFor(() => expect(locationsInput).toBeEnabled(), {timeout: 5000});

      autocomplete.focus();
      fireEvent.change(locationsInput, {target: {value: 'Kallang'}});
      fireEvent.keyDown(autocomplete, {key: 'ArrowDown'});
      fireEvent.keyDown(autocomplete, {key: 'Enter'});
    });

    afterAll(() => jest.resetAllMocks());

    it('filled location list', async () => {
      expect(locationsInput.value).toContain('Kallang, (1.29531332, 103.871146)'); 
    });

    it('shows the location info', () => {
      expect(container.getByTestId('weather')).toBeInTheDocument();
      expect(container.getByTestId('coordinates')).toBeInTheDocument();
      expect(container.getByTestId('cameraId')).toBeInTheDocument();
      expect(container.getByTestId('locationName')).toBeInTheDocument();
    });

    it('opens the image modal', () => {
      container.getByTestId('locationImage').click();
      waitFor(() => {
        expect(container.getByTestId('imageModal')).toBeInTheDocument();
      });
    });
  });
});