import React, { Component } from 'react';
import Header from '../components/Header';

class DoneRecipes extends Component {
  render() {
    return (
      <div>
        <Header title="Done Recipes" search={ false } />
        DoneRecipes
      </div>
    );
  }
}

export default DoneRecipes;
