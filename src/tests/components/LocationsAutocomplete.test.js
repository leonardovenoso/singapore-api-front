import { Provider } from 'react-redux';
import store from '../../rematch/store';
import { render, screen, within, fireEvent } from '@testing-library/react';
import LocationsAutocomplete from '../../components/LocationsAutocomplete';
import { LocationsData } from './locationsData';
import { act } from 'react-dom/test-utils';

describe('LocationsAutocomplete component', () => {
  it('renders locations dropdown', async () => {
    render(
      <Provider store={store}>
        <LocationsAutocomplete locations={[]} isLocationsLoading={true} />
      </Provider>
    );
    expect(screen.getByTestId('locations-autocomplete')).toBeInTheDocument();
  });

  describe('when location input changes', () => {
    let input;

    beforeAll(async () => {
      render(
        <Provider store={store}>
          <LocationsAutocomplete locations={LocationsData} isLocationsLoading={false} />
        </Provider>
      );
      const autocomplete = screen.getByTestId('locations-autocomplete');
      autocomplete.focus();
      input = within(autocomplete).getByRole('combobox');
      fireEvent.change(input, { target: { value: 'Kallang' } });
      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });

      await act(async () => {
        fireEvent.keyDown(autocomplete, { key: 'Enter' });
      });
    });

    it('changes the input value', async () => {
      expect(input.value).toContain('Kallang, (1.29531332, 103.871146)');
    });

    it('updates the store', () => {
      const state = store.getState();
      expect(state.FrontPageModel.selectedLocation.locationName).toContain('Kallang');
    })
  });
});