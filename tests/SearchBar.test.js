import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import RenderWithContext from './helpers/RenderWithRouterContext';

const SEARCH_TOP_TEST_ID = 'search-top-btn';
const SEARCH_INPUT_TEST_ID = 'search-input';
const SEARCH_BTN_TEST_ID = 'exec-search-btn';

describe('Testa componente SearchBar com apenas um resultado', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Verifica se renderiza as informações na rota /drinks e muda quanto a API retorna apenas 1 resultado', async () => {
    const { history } = RenderWithContext(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchIcon = screen.getByTestId(SEARCH_TOP_TEST_ID);
    act(() => {
      userEvent.click(searchIcon);
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    const nameRadio = screen.getByTestId('name-search-radio');

    act(() => {
      userEvent.type(searchInput, 'Spicy Arrabiata Penne');
      userEvent.click(nameRadio);
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/meals/52771');
    }, {
      timeout: 5000,
    });
    const image = await screen.findByTestId('recipe-photo');
    const foodName = await screen.findByTestId('recipe-title');

    expect(image).toBeInTheDocument();
    expect(foodName).toBeInTheDocument();
  });
});

describe('Testa quando a API não retorna resultados', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: null,
      }),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Testa se aparece o alerta', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = RenderWithContext(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchIcon = screen.getByTestId(SEARCH_TOP_TEST_ID);
    act(() => {
      userEvent.click(searchIcon);
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    act(() => {
      userEvent.type(searchInput, 'lamborguine');
      userEvent.click(firstLetterRadio);
      userEvent.click(searchBtn);
    });

    expect(global.alert).toBeCalled();
  });
});

describe('Testa com diversos resultados', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('As bebidas são renderizadas na tela', async () => {
    const { history } = RenderWithContext(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchIcon = screen.getByTestId(SEARCH_TOP_TEST_ID);
    act(() => {
      userEvent.click(searchIcon);
    });
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    act(() => {
      userEvent.type(searchInput, 'a');
      userEvent.click(firstLetterRadio);
      userEvent.click(searchBtn);
    });
    const list = await screen.findByRole('list');
    expect(list).toBeInTheDocument();

    await waitFor(() => {
      const firsItemName = screen.getByTestId('0-card-img');
      expect(firsItemName).toBeInTheDocument();
    }, {
      timeout: 5000,
    });
  });
});
