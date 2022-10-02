import { Provider } from 'react-redux';
import store from '../../rematch/store';
import { render, screen, within, fireEvent } from '@testing-library/react';
import LocationsAutocomplete from '../../components/LocationsAutocomplete';
import { LocationsData } from './locationsData';

describe('LocationsAutocomplete component', () => {
  it('renders locations dropdown', async () => {
    render(
      <Provider store={store}>
        <LocationsAutocomplete locations={[]} isLocationsLoading={true} />
      </Provider>
    );
    expect(screen.getByTestId('locations-autocomplete')).toBeInTheDocument();
  });

  it('selects a location from the list of locations', async () => {
   render(
      <Provider store={store}>
        <LocationsAutocomplete locations={LocationsData} isLocationsLoading={false} />
      </Provider>
    );
  
    const autocomplete = screen.getByTestId('locations-autocomplete');
    autocomplete.focus();
    const input = within(autocomplete).getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Kallang' } });
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });

    expect(input.value).toContain('Kallang, (1.29531332, 103.871146)');
  });
});