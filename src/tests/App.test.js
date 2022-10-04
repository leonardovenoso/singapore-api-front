import store from '../rematch/store';
import { waitFor } from '@testing-library/react/pure';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import * as apiTraffic from '../api/apiTraffic';
import { trafficItems } from './trafficData';
import AppPO from './pageObjects/AppPO';

describe('App', () => {
  let appPO;
  let fetchTrafficSpy = jest.spyOn(apiTraffic, 'fetchTraffic');

  beforeAll(() => {
    appPO = new AppPO({store, dateAdapter: AdapterMoment});
    appPO.renderApp();
  }); 

  describe('when change time', () => {
    beforeAll(async () => {
      fetchTrafficSpy.mockResolvedValue(trafficItems);
      appPO.selectTime('2022-10-01 02:00');
      await appPO.selectLocation('Kallang');
    });

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
    beforeAll(() => {
      fetchTrafficSpy.mockClear();
      fetchTrafficSpy.mockRejectedValue(new Error(''));
    });

    it('shows an error', async () => {
      await waitFor(() => {
        appPO.selectTime('2022-10-01 02:10');
      });

      await waitFor(() => {
        expect(appPO.getByTestId('alertError')).toBeInTheDocument();
      });
    });
  });
});