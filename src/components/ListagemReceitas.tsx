import React from 'react';

function ListagemReceitas() {
  return (
    <div>
      <li>
        <h1>{recipe.local}</h1>
        <img src={ recipe.strMealThumb } alt="meal" />
        <p>
          {recipe.strMeal}
        </p>
      </li>
    </div>
  );
}

export default ListagemReceitas;
