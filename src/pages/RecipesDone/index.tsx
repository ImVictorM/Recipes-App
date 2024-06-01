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
import { useState } from "react";
import { RecipeTypeOrAll } from "@/components/RecipesFilterByType";

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
