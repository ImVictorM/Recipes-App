import { RecipeCategory, RecipeFilterOptions } from "@/services/menu/common";
import { AxiosRequestConfig } from "axios";

export type RecipesProps<T> = {
  icon: {
    element: React.FC<React.SVGProps<SVGElement>>;
    alt: string;
  };
  title: string;
  categories: RecipeCategory[];
  onGetRecipes: (config?: AxiosRequestConfig) => Promise<T[]>;
  onGetRecipesByFilter: (
    query: string,
    filter: RecipeFilterOptions,
    config?: AxiosRequestConfig
  ) => Promise<T[]>;
};
