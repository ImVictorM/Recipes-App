import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Footer', () => {
  it('Se os componentes existem', () => {
    renderWithRouterAndRedux(<Footer />);

    const iconDrinks = screen.getByTestId('drinks-bottom-btn');
    const iconMeals = screen.getByTestId('meals-bottom-btn');

    expect(iconDrinks).toBeInTheDocument();
    expect(iconMeals).toBeInTheDocument();
  });
});
