import {
  mealAndDrinkCircularIcon,
  mealCircularIcon,
  cocktailCircularIcon,
} from "@/assets/icons";
import { RecipeType } from "@/store/slices/menuSlice";
import styles from "@/sass/components/RecipesFilterByType.module.scss";

export type FilterRecipeType = RecipeType | "all";

export type RecipesFilterByTypeProps = {
  onFilterByType: (type: FilterRecipeType) => void;
};

export default function RecipesFilterByType({
  onFilterByType,
}: RecipesFilterByTypeProps) {
  return (
    <div className={`${styles.filters}`}>
      <button
        onClick={() => onFilterByType("all")}
        className={`${styles.filters__button}`}
      >
        <img
          src={mealAndDrinkCircularIcon}
          alt="circular icon an hamburger and a soda"
          className={`${styles.filters__button__img}`}
        />
        <span className={`${styles.filters__button__text}`}>All</span>
      </button>

      <button
        onClick={() => onFilterByType("meal")}
        className={`${styles.filters__button}`}
      >
        <img
          src={mealCircularIcon}
          alt="circular icon with a plate and cutlery"
          className={`${styles.filters__button__img}`}
        />
        <span className={`${styles.filters__button__text}`}>Food</span>
      </button>

      <button
        onClick={() => onFilterByType("drink")}
        className={`${styles.filters__button}`}
      >
        <img
          className={`${styles.filters__button__img}`}
          src={cocktailCircularIcon}
          alt="circular icon with a cocktail"
        />
        <span className={`${styles.filters__button__text}`}>Drinks</span>
      </button>
    </div>
  );
}
