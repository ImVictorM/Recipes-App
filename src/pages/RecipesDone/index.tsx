import React from "react";

import BasicLayout from "@/layouts/BasicLayout";

import CenteredTitleWithIcon from "@/components/CenteredTitleWithIcon";
import RecipesFilterByType from "@/components/RecipesFilterByType";
import RecipesEmptyByType from "@/components/RecipeEmptyByType";
import ListWithPagination from "@/components/ListWithPagination";

import RecipeDoneCard from "./components/RecipeDoneCard";

import useAppSelector from "@/hooks/useAppSelector";

import { selectUser } from "@/store/slices/userSlice";

import CheckCircularIcon from "@/assets/icons/checkCircularIcon.svg";

import {
  selectRecipesDoneByType,
  selectUserRecipesDone,
} from "@/store/slices/menuSlice";

import { RecipeTypeOrAll } from "@/components/RecipesFilterByType.types";

export default function RecipesDone() {
  const user = useAppSelector(selectUser);
  const [recipesDoneType, setRecipesType] =
    React.useState<RecipeTypeOrAll>("all");

  const recipesDone = useAppSelector((state) => {
    if (recipesDoneType === "all") {
      return selectUserRecipesDone(state, user.email);
    } else {
      return selectRecipesDoneByType(state, user.email, recipesDoneType);
    }
  });
  const isRecipesDoneEmpty = React.useMemo(() => {
    return recipesDone.length === 0;
  }, [recipesDone.length]);

  const handleFilterByType = (type: RecipeTypeOrAll) => {
    setRecipesType(type);
  };

  return (
    <BasicLayout>
      <CenteredTitleWithIcon
        title="Done Recipes"
        icon={{ element: CheckCircularIcon, alt: "circular check" }}
      />

      <RecipesFilterByType onFilterByType={handleFilterByType} />

      {isRecipesDoneEmpty && (
        <RecipesEmptyByType type={recipesDoneType} action="completed" />
      )}

      {!isRecipesDoneEmpty && (
        <ListWithPagination
          items={recipesDone}
          onCreateItemCard={(recipeDone) => (
            <RecipeDoneCard recipe={recipeDone} />
          )}
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
