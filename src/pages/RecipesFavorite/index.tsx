import { HeartCircularIcon } from "@/assets/icons";
import {
  CenteredTitleWithIcon,
  ListWithPagination,
  RecipeEmptyByType,
  RecipesFilterByType,
} from "@/components";
import { RecipeTypeOrAll } from "@/components/RecipesFilterByType";
import { useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import {
  selectRecipesFavorite,
  selectRecipesFavoriteByType,
} from "@/store/slices/menuSlice";
import { selectUser } from "@/store/slices/userSlice";
import { useMemo, useState } from "react";
import { RecipeFavoriteCard } from "./components";

export default function RecipesFavorite() {
  const user = useAppSelector(selectUser);
  const [recipesFavoriteType, setRecipeType] = useState<RecipeTypeOrAll>("all");
  const recipesFavorite = useAppSelector((state) => {
    if (recipesFavoriteType === "all") {
      return selectRecipesFavorite(state, user.email);
    } else {
      return selectRecipesFavoriteByType(
        state,
        user.email,
        recipesFavoriteType
      );
    }
  });
  const isRecipesFavoriteEmpty = useMemo(() => {
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
