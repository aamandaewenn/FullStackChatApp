import { render, screen } from '@testing-library/react';
import App from './App';

it('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText('Landing');
  expect(headerElement).toBeInTheDocument('Landing');
});


