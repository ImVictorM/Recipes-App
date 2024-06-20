import React from "react";

import BasicLayout from "@/layouts/BasicLayout";

import CenteredTitleWithIcon from "@/components/ui/CenteredTitleWithIcon";
import RecipesFilterByType from "@/components/ui/RecipesFilterByType";
import RecipeEmptyByType from "@/components/ui/RecipesEmptyByType";
import ListWithPagination from "@/components/ui/ListWithPagination";

import RecipeFavoriteCard from "./components/RecipeFavoriteCard";

import useAppSelector from "@/hooks/useAppSelector";
import useHeadTitle from "@/hooks/useHeadTitle";

import { selectUser } from "@/store/slices/user";
import {
  selectRecipesFavoriteByType,
  selectUserRecipesFavorite,
} from "@/store/slices/menu";

import HeartCircularIcon from "@/assets/icons/heartCircularIcon.svg";

import { RecipeTypeOrAll } from "@/components/ui/RecipesFilterByType/RecipesFilterByType.types";
import { TestableComponent } from "@/types/testableComponent";

export default function RecipesFavorite({
  prefixDataTestId = "RecipesFavorite",
}: TestableComponent) {
  useHeadTitle("Recipes Favorite");
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
    <BasicLayout prefixDataTestId={prefixDataTestId}>
      <CenteredTitleWithIcon
        icon={{
          element: HeartCircularIcon,
          alt: "circular heart",
        }}
        title="Favorites"
        prefixDataTestId={`${prefixDataTestId}.ComponentTitle`}
      />

      <RecipesFilterByType
        prefixDataTestId={`${prefixDataTestId}.ComponentFiltersByType`}
        onFilterByType={handleFilterByType}
      />

      {isRecipesFavoriteEmpty && (
        <RecipeEmptyByType
          prefixDataTestId={`${prefixDataTestId}.ComponentEmpty`}
          type={recipesFavoriteType}
          action="favorite"
        />
      )}

      {!isRecipesFavoriteEmpty && (
        <ListWithPagination
          items={recipesFavorite}
          prefixDataTestId={`${prefixDataTestId}.List`}
          renderItemCard={(recipe, index) => (
            <RecipeFavoriteCard
              prefixDataTestId={`${prefixDataTestId}.List.Item${index}`}
              recipe={recipe}
            />
          )}
          itemsPerPageBySize={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
          maxItemsPerPage={16}
          getItemId={(item) => item.id}
        />
      )}
    </BasicLayout>
  );
}
