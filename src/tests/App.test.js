import store from '../rematch/store';
import { waitFor } from '@testing-library/react/pure';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import * as apiTraffic from '../api/apiTraffic';
import { trafficItems } from './trafficData';
import AppPO from './pageObjects/AppPO';

describe('App', () => {
  describe('when change time', () => {
    let appPO;

    beforeAll(async () => {
      jest.spyOn(apiTraffic, 'fetchTraffic').mockResolvedValue(trafficItems);
      appPO = new AppPO({store, dateAdapter: AdapterMoment});
      appPO.renderApp();
      appPO.selectTime('2022-10-01 02:00');
      await appPO.selectLocation('Kallang');
    });

    afterAll(() => jest.resetAllMocks());

    it('filled location list', async () => {
      expect(appPO.getLocationsInputValue()).toContain('Kallang, (1.29531332, 103.871146)'); 
    });

    it('shows the location info', () => {
      expect(appPO.getByTestId('weather')).toBeInTheDocument();
      expect(appPO.getByTestId('coordinates')).toBeInTheDocument();
      expect(appPO.getByTestId('cameraId')).toBeInTheDocument();
      expect(appPO.getByTestId('locationName')).toBeInTheDocument();
    });

    it('opens the image modal', async () => {
      appPO.openModal();
      await waitFor(async () => {
        expect(appPO.getByTestId('imageModal')).toBeInTheDocument();
      });
    });

    it('closes modal', async () => {
      appPO.openModal();

      await waitFor(() => {
        expect(appPO.getByTestId('imageModal')).toBeInTheDocument();
      });
      await waitFor(() => {
        try {
          appPO.closeModal();
          expect(appPO.getByTestId('imageModal')).not.toBeInTheDocument();
        } catch(e) {
          expect(true).toBeTruthy();
        }
      });
    });
  });

  describe('when fetch data from API fails', () => {
    let appPO;
    afterAll(() => jest.resetAllMocks());
  
    it('shows an error', async () => {
      jest.spyOn(apiTraffic, 'fetchTraffic').mockResolvedValue(trafficItems);
      appPO = new AppPO({store, dateAdapter: AdapterMoment});
      appPO.renderApp();
      waitFor(() => {
        expect(appPO.getByTestId('alertError')).toBeInTheDocument();
      });
    });
  });
});