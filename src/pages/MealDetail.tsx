import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MealDetail({ meals }) {
  const [meal, setFood] = useState([]);
  useEffect(() => {
    setFood([...meals]);
  }, [meals]);

  return (
    <div className="container">
      <h1>MealDetail</h1>
      {
        meal.map((elem, index) => {
          const { strMeal, strMealThumb, idMeal } = elem;
          return (
            <Link key={ idMeal } to={ `/drinks/${elem.idMeal}` }>
              <li
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                  className="img"
                />
                <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              </li>
            </Link>
          );
        })
      }
    </div>

  );
}

function mapStateToProps(state) {
  return {
    meals: state.menu.meals,
  };
}

MealDetail.propTypes = {
  meals: PropTypes.arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(MealDetail);
