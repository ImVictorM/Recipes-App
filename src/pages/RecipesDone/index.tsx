import { CheckCircularIcon } from "@/assets/icons";
import {
  CenteredTitleWithIcon,
  ListWithPagination,
  RecipesFilterByType,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import {
  selectRecipesDone,
  selectRecipesDoneByType,
} from "@/store/slices/menuSlice";
import { selectUser } from "@/store/slices/userSlice";
import { RecipeDoneCard } from "./components";
import { useState, useMemo } from "react";
import { RecipeTypeOrAll } from "@/components/RecipesFilterByType";
import RecipesEmptyByType from "@/components/RecipeEmptyByType";

export default function RecipesDone() {
  const user = useAppSelector(selectUser);
  const [recipesDoneType, setRecipesType] = useState<RecipeTypeOrAll>("all");

  const recipesDone = useAppSelector((state) => {
    if (recipesDoneType === "all") {
      return selectRecipesDone(state, user.email);
    } else {
      return selectRecipesDoneByType(state, user.email, recipesDoneType);
    }
  });
  const isRecipesDoneEmpty = useMemo(() => {
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
