import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  // Render the App component
  render(<App />);

  // Verify that a known element or text appears in the document
  const element = screen.getByText(/welcome/i); 
  expect(element).toBeInTheDocument();
});
