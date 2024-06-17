import { CenteredTitleWithIconProps } from "@/components/ui/CenteredTitleWithIcon/CenteredTitleWithIcon.types";
import {
  GetRecipes,
  GetRecipesByFilter,
  MenuRecipeType,
  RecipeCategory,
} from "@/services/menu/common.types";
import { RecipeType } from "@/store/slices/menu/menuSlice.types";

export type RecipesProps = {
  type: RecipeType;
};

export type RecipesUtils = {
  onGetRecipesByFilter: GetRecipesByFilter<MenuRecipeType>;
  onGetRecipes: GetRecipes<MenuRecipeType>;
  categories: RecipeCategory[];
  title: string;
  icon: CenteredTitleWithIconProps["icon"];
};
