import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkDetail({ drinks }) {
  const [drink, setFood] = useState([]);
  useEffect(() => {
    setFood([...drinks]);
  }, [drinks]);

  return (
    <div className="container">
      <h1>DrinkDetail</h1>
      {
        drink.map((elem, index) => {
          const { strDrink, strDrinkThumb, idDrink } = elem;
          return (
            <Link key={ idDrink } to={ `/drinks/${elem.idDrink}` }>
              <li
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                  className="img"
                />
                <p data-testid={ `${index}-card-name` }>{strDrink}</p>
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
    drinks: state.menu.drinks,
  };
}

DrinkDetail.propTypes = {
  drinks: PropTypes.arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(DrinkDetail);
