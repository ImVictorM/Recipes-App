import { MenuRecipeType } from "@/services/menu/common/types";
import { LoaderCallback } from "@/utils/reactRouterDom/reactRouterDom.types";

export type RecipeDetailsLoader = LoaderCallback<{
  recipe: MenuRecipeType;
  recommendations: Promise<MenuRecipeType[]>;
}>;

export type RecipeInProgressLoader = LoaderCallback<{
  recipe: MenuRecipeType;
}>;
