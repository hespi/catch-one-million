import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerSelection from './player-selection';
import Player from '../../classes/player';

const mockOnPlayerSelectionFinished = jest.fn((players:Player[]) => {

});

test('renders game home', () => {
  render(<PlayerSelection maxPlayers={8} onPlayerSelectionFinished={mockOnPlayerSelectionFinished} />);
  const playerSelection = screen.getByTestId('player-selection');
  expect(playerSelection).toBeInTheDocument();
});
