import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../src/App';

describe('Testando tela de Perfil', () => {
  it('Se os elementos existem', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });

    const title = screen.getByRole('heading', {
      name: /profile/i,
    });
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(title).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(logoutBtn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    }, { timeout: 5000 });
  });

  it('Se o botão Done redireciona', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const doneBtn = screen.getByTestId('profile-done-btn');

    act(() => {
      userEvent.click(doneBtn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    }, { timeout: 5000 });
  });
  it('Se o botão Favorite redireciona', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');

    act(() => {
      userEvent.click(favoriteBtn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    }, { timeout: 5000 });
  });
});
