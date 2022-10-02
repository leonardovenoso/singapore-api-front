import { render } from '@testing-library/react';
import CustomBox from '../../components/CustomBox';

describe('CustomBox', () => {
  it('displays a custombox', () => {
    const container = render(<CustomBox role='container'/>);
    expect(container.getByRole('container')).toBeInTheDocument();
  });
});
