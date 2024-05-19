import { SearchBar } from "@/components";
import { useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import { selectMenu } from "@/store/slices/menuSlice";
import { selectVisibility } from "@/store/slices/visibilitySlice";
import { Link } from "react-router-dom";

export default function Meals() {
  const visibility = useAppSelector(selectVisibility);
  const menu = useAppSelector(selectMenu);

  return (
    <BasicLayout containHeaderSearchBar>
      <h1 className="mt-4" data-testid="page-title">
        Meals
      </h1>

      {visibility.showSearchBar && <SearchBar searchFor="meals" />}

      <ul className="mt-5">
        {menu.meals.map(({ strMeal, strMealThumb, idMeal }, index) => {
          return (
            <Link key={idMeal} to={`/meals/${idMeal}`}>
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
    </BasicLayout>
  );
}
