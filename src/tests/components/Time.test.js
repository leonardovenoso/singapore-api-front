import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Time from '../../components/Time';

describe('Time component', () => {
  it('renders the date and time select', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Time />
      </LocalizationProvider>
    );
    expect(screen.getByTestId('date-time-picker')).toBeInTheDocument();
  });

  it('selects a date and time', async () => {
    const container = render(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Time />
      </LocalizationProvider>
    );

    const input = container.getByRole('textbox');
    waitFor(() => {
      input.focus();
      fireEvent.change(input, { target: { value: '2022-10-01 02:00' }});
      expect(input.value).toEqual('2022-10-01 02:00');
    });
  });
});