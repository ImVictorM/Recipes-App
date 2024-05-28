import {
  mealAndDrinkCircularIcon,
  mealCircularIcon,
  cocktailCircularIcon,
} from "@/assets/icons";
import "@/sass/components/_recipesFilterByType.scss";
import { RecipeType } from "@/store/slices/menuSlice";

export type RecipesFilterByTypeProps = {
  onFilterByType: (type: RecipeType | "all") => void;
};

export default function RecipesFilterByType({
  onFilterByType,
}: RecipesFilterByTypeProps) {
  return (
    <div className="recipes-filter">
      <button onClick={() => onFilterByType("all")} className="button-filter">
        <img
          src={mealAndDrinkCircularIcon}
          alt="circular icon an hamburger and a soda"
          className="button-filter-img"
        />
        <span className="button-filter-text">All</span>
      </button>

      <button onClick={() => onFilterByType("meal")} className="button-filter">
        <img
          src={mealCircularIcon}
          alt="circular icon with a plate and cutlery"
          className="button-filter-img"
        />
        <span className="button-filter-text">Food</span>
      </button>

      <button onClick={() => onFilterByType("drink")} className="button-filter">
        <img
          className="button-filter-img"
          src={cocktailCircularIcon}
          alt="circular icon with a cocktail"
        />
        <span className="button-filter-text">Drinks</span>
      </button>
    </div>
  );
}
