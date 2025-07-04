import React from 'react';
import { render, screen } from './test-utils';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to Facet & Co\./i);
  expect(welcomeElement).toBeInTheDocument();
});
