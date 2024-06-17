import MealAndDrinkCircularIcon from "@/assets/icons/mealAndDrinkCircularIcon.svg";
import MealCircularIcon from "@/assets/icons/mealCircularIcon.svg";
import CocktailCircularIcon from "@/assets/icons/cocktailCircularIcon.svg";

import styles from "@/sass/components/ui/RecipesFilterByType.module.scss";

import { RecipesFilterByTypeProps } from "./RecipesFilterByType.types";

export default function RecipesFilterByType({
  onFilterByType,
}: RecipesFilterByTypeProps) {
  return (
    <div className={`${styles.filters}`} data-testid="RecipeFiltersByType">
      <button
        onClick={() => onFilterByType("all")}
        className={`${styles.filters__button}`}
        data-testid="RecipeFiltersByType.ButtonAll"
      >
        <MealAndDrinkCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon an hamburger and a soda"
          data-testid="RecipeFiltersByType.ButtonAll.Img"
        />
        <span data-testid="RecipeFiltersByType.ButtonAll.Text">All</span>
      </button>

      <button
        onClick={() => onFilterByType("meal")}
        className={`${styles.filters__button}`}
        data-testid="RecipeFiltersByType.ButtonMeal"
      >
        <MealCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon with a plate and cutlery"
          data-testid="RecipeFiltersByType.ButtonMeal.Img"
        />
        <span data-testid="RecipeFiltersByType.ButtonMeal.Text">Food</span>
      </button>

      <button
        onClick={() => onFilterByType("drink")}
        className={`${styles.filters__button}`}
        data-testid="RecipeFiltersByType.ButtonDrink"
      >
        <CocktailCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon with a cocktail"
          data-testid="RecipeFiltersByType.ButtonDrink.Img"
        />

        <span data-testid="RecipeFiltersByType.ButtonDrink.Text">Drinks</span>
      </button>
    </div>
  );
}
