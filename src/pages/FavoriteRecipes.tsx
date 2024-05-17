import React, { Component } from 'react';
import Header from '../components/Header';

class FavoriteRecipes extends Component {
  render() {
    return (
      <div>
        <Header title="Favorite Recipes" search={ false } />
      </div>
    );
  }
}

export default FavoriteRecipes;
