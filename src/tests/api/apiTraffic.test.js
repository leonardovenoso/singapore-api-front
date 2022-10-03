import { trafficItems } from '../trafficData';
import { fetchTraffic } from '../../api/apiTraffic';

describe('apiTraffic', () => {
  describe('fetchTraffic()', () => {
    it ('fetches traffic data', async () => {
      global.fetch = jest.fn(() => Promise.resolve({ json: () => trafficItems }));
      const res = await fetchTraffic();
      expect(res.items.cameras).not.toEqual([]);
    });
  });

  describe('when fetchTraffic api is down', () => {
    it('returns an empty array', async () => {
      global.fetch = jest.fn(() => Promise.reject('API is down'));
      const res = await fetchTraffic();
      expect(res.items.cameras).toEqual([]);
    });
  });
});