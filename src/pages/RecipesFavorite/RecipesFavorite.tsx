import React from "react";

import BasicLayout from "@/layouts/BasicLayout";

import CenteredTitleWithIcon from "@/components/CenteredTitleWithIcon";
import RecipesFilterByType from "@/components/RecipesFilterByType";
import RecipeEmptyByType from "@/components/RecipeEmptyByType";
import ListWithPagination from "@/components/ListWithPagination";

import RecipeFavoriteCard from "./components/RecipeFavoriteCard";

import useAppSelector from "@/hooks/useAppSelector";

import { selectUser } from "@/store/slices/user";
import {
  selectRecipesFavoriteByType,
  selectUserRecipesFavorite,
} from "@/store/slices/menu";

import HeartCircularIcon from "@/assets/icons/heartCircularIcon.svg";

import { RecipeTypeOrAll } from "@/components/RecipesFilterByType/RecipesFilterByType.types";

export default function RecipesFavorite() {
  const user = useAppSelector(selectUser);
  const [recipesFavoriteType, setRecipeType] =
    React.useState<RecipeTypeOrAll>("all");
  const recipesFavorite = useAppSelector((state) => {
    if (recipesFavoriteType === "all") {
      return selectUserRecipesFavorite(state, user.email);
    } else {
      return selectRecipesFavoriteByType(
        state,
        user.email,
        recipesFavoriteType
      );
    }
  });
  const isRecipesFavoriteEmpty = React.useMemo(() => {
    return recipesFavorite.length === 0;
  }, [recipesFavorite.length]);

  const handleFilterByType = (type: RecipeTypeOrAll) => {
    setRecipeType(type);
  };

  return (
    <BasicLayout>
      <CenteredTitleWithIcon
        icon={{
          element: HeartCircularIcon,
          alt: "circular heart",
        }}
        title="Favorites"
      />

      <RecipesFilterByType onFilterByType={handleFilterByType} />

      {isRecipesFavoriteEmpty && (
        <RecipeEmptyByType type={recipesFavoriteType} action="favorite" />
      )}

      {!isRecipesFavoriteEmpty && (
        <ListWithPagination
          items={recipesFavorite}
          onCreateItemCard={(recipe) => <RecipeFavoriteCard recipe={recipe} />}
          showBySize={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
          maxItemsPerPage={16}
        />
      )}
    </BasicLayout>
  );
}
