import React from "react";

import BasicLayout from "@/layouts/BasicLayout";

import CenteredTitleWithIcon from "@/components/ui/CenteredTitleWithIcon";
import RecipesFilterByType from "@/components/ui/RecipesFilterByType";
import RecipesEmptyByType from "@/components/ui/RecipesEmptyByType";
import ListWithPagination from "@/components/ui/ListWithPagination";

import RecipeDoneCard from "./components/RecipeDoneCard";

import useAppSelector from "@/hooks/useAppSelector";
import useHeadTitle from "@/hooks/useHeadTitle";

import { selectUser } from "@/store/slices/user";
import {
  selectRecipesDoneByType,
  selectUserRecipesDone,
} from "@/store/slices/menu";

import CheckCircularIcon from "@/assets/icons/checkCircularIcon.svg";

import { RecipeTypeOrAll } from "@/components/ui/RecipesFilterByType/RecipesFilterByType.types";
import { TestableComponent } from "@/types/testableComponent";

export default function RecipesDone({
  prefixDataTestId = "RecipesDone",
}: TestableComponent) {
  useHeadTitle("Recipes Done");
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
    <BasicLayout prefixDataTestId={prefixDataTestId}>
      <CenteredTitleWithIcon
        title="Done Recipes"
        icon={{ element: CheckCircularIcon, alt: "circular check" }}
        prefixDataTestId={`${prefixDataTestId}.ComponentTitle`}
      />

      <RecipesFilterByType onFilterByType={handleFilterByType} />

      {isRecipesDoneEmpty && (
        <RecipesEmptyByType
          type={recipesDoneType}
          action="completed"
          prefixDataTestId={`${prefixDataTestId}.ComponentEmpty`}
        />
      )}

      {!isRecipesDoneEmpty && (
        <ListWithPagination
          items={recipesDone}
          prefixDataTestId={`${prefixDataTestId}.List`}
          renderItemCard={(recipeDone, index) => (
            <RecipeDoneCard
              prefixDataTestId={`${prefixDataTestId}.List.Item${index}`}
              recipe={recipeDone}
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
