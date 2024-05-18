import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/searchBy.css";

export default function SearchBar({ searchInput }) {
  const [methodToSearch, setMethodToSearch] = useState("");
  const location = useLocation();
  const [menu, setMenu] = useState([]);

  const handleChange = ({ target: { value } }) => {
    setMethodToSearch(value);
  };

  const fetchMeals = () => {};

  const fetchCocktails = () => {};

  const handleSearch = async () => {
    if (location.pathname.includes("meals")) {
      fetchMeals();
    } else if (location.pathname.includes("drinks")) {
      fetchCocktails();
    }
    const fetchedMenu = await getMeal(methodToSearch, searchInput, pathname);
    if (pathname === "/drinks") {
      dispatch(actSetDrinks(fetchedMenu));
    } else {
      dispatch(actSetMeals(fetchedMenu));
    }

    if (fetchedMenu.length === 0) {
      global.alert("Sorry, we haven't found any recipes for these filters.");
    }
    if (fetchedMenu.length === 1) {
      let fetchedMenuId = null;
      switch (pathname) {
        case "/drinks":
          fetchedMenuId = fetchedMenu[0].idDrink;
          break;
        default:
          fetchedMenuId = fetchedMenu[0].idMeal;
          break;
      }
      push(`${pathname}/${fetchedMenuId}`);
    } else if (fetchedMenu.length > TWELVE) {
      const firstTwelve = fetchedMenu.filter((_elem, index) => index < TWELVE);
      setMenu(firstTwelve);
    } else {
      setMenu(fetchedMenu);
    }
    setSearch(true);
  };

  return (
    <section className="container-search">
      <div className="search-bar">
        <div className="searchbar-input">
          <label htmlFor="ingredient">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="searchOption"
              onChange={handleChange}
              value="Ingredient"
            />
            Ingredient
          </label>

          <label htmlFor="name">
            <input
              type="radio"
              data-testid="name-search-radio"
              id="name"
              name="searchOption"
              onChange={handleChange}
              value="Name"
            />
            Name
          </label>

          <label htmlFor="First letter">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="First letter"
              name="searchOption"
              onChange={handleChange}
              value="First Letter"
            />
            First letter
          </label>
        </div>

        <div>
          <button
            className="btn-search"
            data-testid="exec-search-btn"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <ul className="mt-5">
        {menu.map((food, index) => {
          const {
            location: { pathname },
          } = history;
          if (pathname === "/drinks") {
            const { strDrink, strDrinkThumb, idDrink } = food;
            return (
              <Link key={idDrink} to={`/drinks/${food.idDrink}`}>
                <li data-testid={`${index}-recipe-card`}>
                  <img
                    src={strDrinkThumb}
                    alt={strDrink}
                    data-testid={`${index}-card-img`}
                    className="img"
                  />
                  <p data-testid={`${index}-card-name`}>{strDrink}</p>
                </li>
              </Link>
            );
          }
          const { strMeal, strMealThumb, idMeal } = food;
          return (
            <Link key={idMeal} to={`/meals/${food.idMeal}`}>
              <li data-testid={`${index}-recipe-card`}>
                <img
                  className="img"
                  src={strMealThumb}
                  alt={strMeal}
                  data-testid={`${index}-card-img`}
                />
                <p data-testid={`${index}-card-name`}>{strMeal}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
