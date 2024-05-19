import { SearchBar } from "@/components";
import { useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import { selectMenu } from "@/store/slices/menuSlice";
import { selectVisibility } from "@/store/slices/visibilitySlice";
import { Link } from "react-router-dom";

function Drinks() {
  const visibility = useAppSelector(selectVisibility);
  const menu = useAppSelector(selectMenu);

  return (
    <BasicLayout containHeaderSearchBar>
      <h1 className="mt-4" data-testid="page-title">
        Drinks
      </h1>

      {visibility.showSearchBar && <SearchBar searchFor="drinks" />}

      <ul className="mt-5">
        {menu.drinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => {
          return (
            <Link key={idDrink} to={`/drinks/${idDrink}`}>
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
        })}
      </ul>
    </BasicLayout>
  );
}

export default Drinks;
