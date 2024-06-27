import MealAndDrinkCircularIcon from "@/assets/icons/mealAndDrinkCircularIcon.svg";
import MealCircularIcon from "@/assets/icons/mealCircularIcon.svg";
import CocktailCircularIcon from "@/assets/icons/cocktailCircularIcon.svg";

import styles from "@/sass/components/ui/RecipesFilterByType.module.scss";

import { RecipesFilterByTypeProps } from "./RecipesFilterByType.types";

export default function RecipesFilterByType({
  onFilterByType,
  prefixDataTestId = "RecipeFiltersByType",
}: RecipesFilterByTypeProps) {
  return (
    <div className={`${styles.filters}`} data-testid={prefixDataTestId}>
      <button
        onClick={() => onFilterByType("all")}
        className={`${styles.filters__button}`}
        data-testid={`${prefixDataTestId}.ButtonAll`}
      >
        <MealAndDrinkCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon an hamburger and a soda"
          data-testid={`${prefixDataTestId}.ButtonAll.Img`}
        />
        <span data-testid={`${prefixDataTestId}.ButtonAll.Text`}>All</span>
      </button>

      <button
        onClick={() => onFilterByType("meal")}
        className={`${styles.filters__button}`}
        data-testid={`${prefixDataTestId}.ButtonMeal`}
      >
        <MealCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon with a plate and cutlery"
          data-testid={`${prefixDataTestId}.ButtonMeal.Img`}
        />
        <span data-testid={`${prefixDataTestId}.ButtonMeal.Text`}>Food</span>
      </button>

      <button
        onClick={() => onFilterByType("drink")}
        className={`${styles.filters__button}`}
        data-testid={`${prefixDataTestId}.ButtonDrink`}
      >
        <CocktailCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon with a cocktail"
          data-testid={`${prefixDataTestId}.ButtonDrink.Img`}
        />

        <span data-testid={`${prefixDataTestId}.ButtonDrink.Text`}>Drinks</span>
      </button>
    </div>
  );
}
