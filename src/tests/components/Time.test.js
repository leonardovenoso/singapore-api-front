import { Provider } from 'react-redux';
import store from '../../rematch/store';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Time from '../../components/Time';

describe('Time component', () => {
  it('renders the date and time select', async () => {
    render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Time />
        </LocalizationProvider>
      </Provider>
    );
    expect(screen.getByTestId('date-time-picker')).toBeInTheDocument();
  });

  it('selects a date and time', async () => {
    const container = render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Time />
        </LocalizationProvider>
      </Provider>
    );

    const input = container.getByRole('textbox');
    fireEvent.change(input, {target: {value: '2022-10-01 02:00'}});
    expect(input.value).toEqual('2022-10-01 02:00');
  });

  it('updates the store when a time is selected', async () => {
    const container = render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Time />
        </LocalizationProvider>
      </Provider>
    );

    const input = container.getByRole('textbox');
    fireEvent.change(input, {target: {value: '2022-10-01 02:00'}});
    fireEvent.keyDown(input, { key: 'Enter' });
    const state = store.getState();
    expect(state.FrontPageModel.time).toEqual('2022-10-01T02:00:00');
  });
});