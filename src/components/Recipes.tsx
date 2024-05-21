import { useState } from "react";
import { Link } from "react-router-dom";
import RecipeFiltersByCategory from "./RecipeFiltersByCategory";
import "../styles/components/Recipes.css";

export default function Recipes({ history }) {
  const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //   const recipe = async () => {
  //     const awaitMeal = await getMeal("Name", "", history.location.pathname);
  //     const twelve = 12;
  //     const firstTwelve = awaitMeal.filter((_elem, index) => index < twelve);
  //     setMenu(firstTwelve);
  //   };
  //   recipe();
  // }, [history]);

  // const handleGetCategories = async ({ target }) => {
  //   const { name, checked } = target;
  //   const {
  //     location: { pathname },
  //   } = history;
  //   const TWELVE = 12;
  //   try {
  //     const result =
  //       name === "ALL" || checked === false
  //         ? await getMeal("Name", "", pathname)
  //         : await getMeal("Category", name, pathname);
  //     const firstTwelve = result.slice(0, TWELVE);
  //     setMenu(firstTwelve);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <RecipeFiltersByCategory handleGetCategories={handleGetCategories} />
      <div className="recipes-div">
        <ul>
          {menu.map((food, index) => {
            if (history.location.pathname === "/drinks") {
              const { strDrink, strDrinkThumb, idDrink } = food;
              return (
                <Link key={idDrink} to={`/drinks/${food.idDrink}`}>
                  <li data-testid={`${index}-recipe-card`}>
                    <img
                      data-testid={`${index}-card-img`}
                      src={strDrinkThumb}
                      alt={strDrink}
                      className="img"
                    />
                    <p data-testid={`${index}-card-name`} className="mt-1">
                      {strDrink}
                    </p>
                  </li>
                </Link>
              );
            }
            const { strMeal, strMealThumb, idMeal } = food;
            return (
              <Link key={idMeal} to={`/meals/${food.idMeal}`}>
                <li data-testid={`${index}-recipe-card`}>
                  <img
                    data-testid={`${index}-card-img`}
                    src={strMealThumb}
                    alt={strMeal}
                    className="img"
                  />
                  <p data-testid={`${index}-card-name`} className="mt-1">
                    {strMeal}
                  </p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
