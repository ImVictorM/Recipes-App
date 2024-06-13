import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando o componente Login', () => {
  const validPassword = 'abc1234';
  const validEmail = 'abc@hotmail.com';
  it('Verificando se a pagina login tem o comportamento desejado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const password = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    expect(password).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    userEvent.type(password, validPassword);
    userEvent.type(emailInput, validEmail);
    expect(password.value).toBe(validPassword);
    expect(emailInput.value).toBe(validEmail);
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    }, { timeout: 5000 });
  });

  it('Verifica se as informações são salvas na store', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const password = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    act(() => {
      userEvent.type(password, validPassword);
      userEvent.type(emailInput, validEmail);
      userEvent.click(loginButton);
    });
    const {
      login: {
        password: statePassword,
        email: stateEmail,
      },
    } = store.getState();

    expect(stateEmail).toEqual(validEmail);
    expect(statePassword).toEqual(validPassword);
  });
});
