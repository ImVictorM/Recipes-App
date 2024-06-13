import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithContext from './helpers/RenderWithRouterContext';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import { setLocalStorage } from '../services/localStorage';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';

const FAVORITE_BTN_TEST_ID = 'favorite-btn';
const PATH_TO_TEST = '/meals/52771';
const PASTA_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
describe('Testa página RecipeDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(async (endpoint) => ({
      json: jest.fn()
        .mockImplementation(async () => (endpoint === PASTA_ENDPOINT ? oneMeal : drinks)),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Ao clicar em uma receita, ele direciona corretamente', async () => {
    const mockLocalFavorite = {
      alcohilicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    };
    setLocalStorage('favoriteRecipes', [mockLocalFavorite]);
    const { history } = RenderWithContext(<App />);
    act(() => {
      history.push(PATH_TO_TEST);
    });
    expect(history.location.pathname).toEqual(PATH_TO_TEST);

    const recipeTitle = screen.getByTestId('recipe-title');
    const favoriteButton = screen.getByTestId(FAVORITE_BTN_TEST_ID);
    const share = screen.getByTestId('share-btn');

    const recipeName = await screen.findByRole('heading', {
      name: /Spicy Arrabiata Penne/i,
    });
    expect(recipeName).toBeInTheDocument();

    expect(share).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);

    const btnStartRecipe = await screen.findByTestId('start-recipe-btn');

    expect(btnStartRecipe).toBeInTheDocument();

    userEvent.click(btnStartRecipe);
  });
});

describe('Testa o drinks', () => {
  const mockLocalFavorite2 = {
    id: '178319',
    type: 'drink',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  };

  setLocalStorage('favoriteRecipes', [mockLocalFavorite2]);
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(async (endpoint) => ({
      json: jest.fn()
        .mockImplementation(async () => (endpoint === DRINK_ENDPOINT ? oneDrink : meals)),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Se aparece alcoholic e botão start', async () => {
    const { history } = RenderWithContext(<App />);
    act(() => {
      history.push('/drinks/178319');
    });

    expect(history.location.pathname).toContain('drinks');

    const textAlcohol = await screen.findByTestId('recipe-category');
    const btnStartRecipe = await screen.findByTestId('start-recipe-btn');
    const favoriteButton = screen.getByTestId(FAVORITE_BTN_TEST_ID);

    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);

    expect(textAlcohol).toBeInTheDocument();
    expect(btnStartRecipe).toBeInTheDocument();

    userEvent.click(btnStartRecipe);
  });

  it('', () => {
    const mockObj = {
      drinks: {
        178319: [],
      },
      meals: {
        52771: [],
      },
    };
    setLocalStorage('inProgressRecipes', mockObj);
    const { history } = RenderWithContext(<App />);
    act(() => {
      history.push('/drinks/178319');
    });

    expect(history.location.pathname).toContain('drinks');
  });
});
