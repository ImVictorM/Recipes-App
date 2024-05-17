import React, { useEffect, useState, useCallback, useContext } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsApi from '../services/RecipeDetailsApi';
import Recomendations from '../components/Recomendations';
import '../styles/pages/RecipeDetals.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import { Mycontext } from '../context/MyContext';

function RecipeDetails({ history }) {
  const { location: { pathname } } = history;
  const { handleCopy, shareCopy } = useContext(Mycontext);
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [defaultApi, setDefaultApi] = useState({});
  const [parameters, setParameters] = useState([]);

  const [ingredientsAndMeasures, setIngredientsAndMeasure] = useState({
    ingredients: [],
    measures: [],
  });
  const [isInProgress, setIsInProgress] = useState(false);
  const separateIngredientsAndMeasures = (obj) => {
    const entries = Object.entries(obj);
    const extractIngredientsAndMeasure = entries.reduce((acc, element) => {
      const accCopy = { ...acc };
      const key = element[0];
      const value = element[1];
      if (key.includes('Ingredient') && value) {
        accCopy.ingredients.push(value);
      }
      if (key.includes('Measure') && (value !== ' ')) {
        accCopy.measures.push(value);
      }
      return accCopy;
    }, {
      ingredients: [],
      measures: [],
    });
    setIngredientsAndMeasure(extractIngredientsAndMeasure);
  };
  const verifyPathname = useCallback((categoryApi) => {
    if (categoryApi) {
      separateIngredientsAndMeasures(categoryApi[0]);

      if (pathname === `/drinks/${id}`) {
        const {
          strDrink,
          strDrinkThumb,
          idDrink, strCategory,
          strInstructions,
          strAlcoholic,
        } = categoryApi[0];

        const data = {
          instruction: strInstructions,
          alcohol: strAlcoholic,
          category: strCategory,
          picture: strDrinkThumb,
          title: strDrink,
          id: idDrink,
        };
        setParameters(data);
      } else {
        const { strMeal, strMealThumb, idMeal, strCategory, strInstructions, strYoutube,
        } = categoryApi[0];
        const data = {
          video: strYoutube,
          instruction: strInstructions,
          category: strCategory,
          picture: strMealThumb,
          title: strMeal,
          id: idMeal,
        };
        setParameters(data);
      }
    }
  }, [id, pathname]);
  useEffect(() => {
    const handleFilter = async () => {
      const categoryApi = await RecipeDetailsApi(id, pathname);
      if (categoryApi) {
        setDefaultApi(categoryApi[0]);
        verifyPathname(categoryApi);
      }
    };
    handleFilter();
  }, [history, id, pathname, verifyPathname]);

  const handleFavorite = () => {
    const {
      idDrink,
      idMeal,
      strArea,
      strCategory,
      strAlcoholic,
      strDrink,
      strMeal,
      strDrinkThumb,
      strMealThumb,
    } = defaultApi;

    const newFavorite = {
      id: idDrink || idMeal,
      type: pathname.includes('drink') ? 'drink' : 'meal',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink || strMeal,
      image: strDrinkThumb || strMealThumb,
    };

    const recipeIsFavorite = favorites
      .some((recipe) => Number(recipe.id) === Number(id));
    if (recipeIsFavorite) {
      const removedItem = favorites.filter((recipe) => (
        Number(recipe.id) !== Number(id)
      ));
      setLocalStorage('favoriteRecipes', removedItem);
      setFavorites(removedItem);
    } else {
      setLocalStorage('favoriteRecipes', [...favorites, newFavorite]);
      setFavorites([...favorites, newFavorite]);
    }
  };

  useEffect(() => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    const recipesInProgress = getLocalStorage('inProgressRecipes') || {};
    const key = pathname.includes('drinks') ? 'drinks' : 'meals';
    const keys = Object.keys(recipesInProgress[key] || []);
    setIsInProgress(keys.includes(id));
    if (favoriteRecipes !== null) {
      setFavorites(favoriteRecipes);
    }
  }, [pathname, id]);

  const handleStartedRecipes = () => {
    const defaultObj = {
      drinks: {
      },
      meals: {
      },
    };
    const inProgressRecipes = getLocalStorage('inProgressRecipes') || defaultObj;
    const key = pathname.includes('drinks') ? 'drinks' : 'meals';
    inProgressRecipes[key][id] = [];
    if (inProgressRecipes) {
      setLocalStorage('inProgressRecipes', inProgressRecipes);
    }
    history.push(`${parameters.id}/in-progress`);
  };

  const { ingredients, measures } = ingredientsAndMeasures;
  return (
    <div className="container justify-content-center">
      <section>
        <button
          type="button"
          onClick={ handleCopy }
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="Botão compartilhar" />
        </button>
        <p>{shareCopy}</p>
        <button
          type="button"
          onClick={ handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ favorites.some(((element) => Number(element.id) === Number(id)
            )) ? blackHeartIcon : whiteHeartIcon }
            alt="Botão favoritar"
          />
        </button>
      </section>
      <img
        className="image-food"
        data-testid="recipe-photo"
        src={ parameters.picture }
        alt={ parameters.title }
      />
      <h1 data-testid="recipe-title">{parameters.title}</h1>
      {
        (pathname === `/drinks/${parameters.id}`)
        && <p data-testid="recipe-category">{parameters.alcohol}</p>
      }
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${ingredient} ${measures[index]}`}
              </li>
            ))
          }
        </ul>
      </div>
      <p data-testid="recipe-category">{parameters.category}</p>
      <p data-testid="instructions">{parameters.instruction}</p>
      {
        (pathname === `/meals/${parameters.id}`)
        && (
          <div className="ratio ratio-16x9 mb-3">
            <iframe
              data-testid="video"
              title="youtube video"
              src={ parameters.video.replace('watch?v=', 'embed/') }
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )
      }
      <Recomendations />
      <button
        type="button"
        className="btn fixed-bottom"
        data-testid="start-recipe-btn"
        onClick={ handleStartedRecipes }
      >
        {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};
export default withRouter(RecipeDetails);
