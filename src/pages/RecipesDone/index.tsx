import { checkCircularIcon } from "@/assets/icons";
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
import { useState } from "react";
import { FilterRecipeType } from "@/components/RecipesFilterByType";

export default function RecipesDone() {
  const user = useAppSelector(selectUser);
  const [recipesType, setRecipesType] = useState<FilterRecipeType>("all");

  const recipesDone = useAppSelector((state) => {
    if (recipesType === "all") {
      return selectRecipesDone(state, user.email);
    } else {
      return selectRecipesDoneByType(state, user.email, recipesType);
    }
  });

  const handleFilterByType = (type: FilterRecipeType) => {
    setRecipesType(type);
  };

  return (
    <BasicLayout>
      <CenteredTitleWithIcon
        title="Done Recipes"
        icon={{ src: checkCircularIcon, alt: "check" }}
      />

      <RecipesFilterByType onFilterByType={handleFilterByType} />

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
    </BasicLayout>
  );
}
