import { RecipesFilterByTypeProps } from "./RecipesFilterByType.types";

import MealAndDrinkCircularIcon from "@/assets/icons/mealAndDrinkCircularIcon.svg";
import MealCircularIcon from "@/assets/icons/mealCircularIcon.svg";
import CocktailCircularIcon from "@/assets/icons/cocktailCircularIcon.svg";

import styles from "@/sass/components/RecipesFilterByType.module.scss";

export default function RecipesFilterByType({
  onFilterByType,
}: RecipesFilterByTypeProps) {
  return (
    <div className={`${styles.filters}`}>
      <button
        onClick={() => onFilterByType("all")}
        className={`${styles.filters__button}`}
      >
        <MealAndDrinkCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon an hamburger and a soda"
        />
        <span className={`${styles.filters__button__text}`}>All</span>
      </button>

      <button
        onClick={() => onFilterByType("meal")}
        className={`${styles.filters__button}`}
      >
        <MealCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon with a plate and cutlery"
        />
        <span className={`${styles.filters__button__text}`}>Food</span>
      </button>

      <button
        onClick={() => onFilterByType("drink")}
        className={`${styles.filters__button}`}
      >
        <CocktailCircularIcon
          role="img"
          className={`${styles.filters__button__img}`}
          aria-label="circular icon with a cocktail"
        />

        <span className={`${styles.filters__button__text}`}>Drinks</span>
      </button>
    </div>
  );
}
