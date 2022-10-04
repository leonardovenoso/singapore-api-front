import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { render, fireEvent, within, waitFor } from '@testing-library/react/pure';
import App from '../../App';

class AppPO  {
  constructor({store, dateAdapter}) {
    this.store = store;
    this.dateAdapter = dateAdapter;
    this.container;
    this.locationsInput;
  }

  renderApp() {
    this.container = render(
      <Provider store={this.store}>
        <LocalizationProvider dateAdapter={this.dateAdapter}>
          <App />
        </LocalizationProvider>
      </Provider>
  )};
  
  selectTime(time) {
    const input = within(this.container.getAllByTestId('date-time-picker')[0]).getByRole('textbox');
    fireEvent.change(input, {target: {value: time}});
    fireEvent.keyDown(input, { key: 'Enter' });
  };

  async selectLocation(locationName){
    const autocomplete = this.container.getByTestId('locations-autocomplete');
    this.locationsInput = within(autocomplete).getByRole('combobox');
    await waitFor(() => expect(this.locationsInput).toBeEnabled(), {timeout: 5000});
  
    autocomplete.focus();
    fireEvent.change(this.locationsInput, {target: {value: locationName}});
    fireEvent.keyDown(autocomplete, {key: 'ArrowDown'});
    fireEvent.keyDown(autocomplete, {key: 'Enter'});
  };

  openModal() {
    this.container.getByTestId('locationImage').click();
  };

  closeModal() {
    this.container.getByTestId('closeModal').click();
  };

  getByTestId(id) {
    return this.container.getByTestId(id);
  };

  getLocationsInputValue() {
    return this.locationsInput.value;
  };
};

export default AppPO;
