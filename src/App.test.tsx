import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game home', () => {
  render(<App />);
  const gameHome = screen.getByTestId('game-home');
  expect(gameHome).toBeInTheDocument();
});
