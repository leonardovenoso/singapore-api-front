const TRAFFIC_API = 'https://api.data.gov.sg/v1/transport/traffic-images';

export const fetchTraffic = async (time) => {
  try {
    const resp = await fetch(`${TRAFFIC_API}?date_time=${time}`);
    const json = await resp.json();
    return json;
  } catch (e) {
    return {
      items: {
        cameras: [],
      },
    };
  }
};
