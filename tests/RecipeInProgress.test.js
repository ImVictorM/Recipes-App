import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithContext from './helpers/RenderWithRouterContext';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';

describe('Testa o componente RecipeInProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Se existe o botão Finish Recipe', async () => {
    const { history } = RenderWithContext(<App />);

    act(() => {
      history.push('/drinks/15997/in-progress');
    });

    const btnFinish = screen.getByTestId('finish-recipe-btn');
    expect(btnFinish).toBeInTheDocument();
  });

  it('Se existe o botão favorite', () => {
    const { history } = RenderWithContext(<App />);

    act(() => {
      history.push('/drinks/15997/in-progress');
    });

    const btnFavorite = screen.getByTestId('favorite-btn');

    userEvent.click(btnFavorite);
    userEvent.click(btnFavorite);
  });
});
