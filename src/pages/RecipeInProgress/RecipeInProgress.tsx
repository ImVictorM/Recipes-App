import React from "react";
import { Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import HeroLayout from "@/layouts/HeroLayout";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

import {
  selectRecipeInProgressIngredients,
  selectIsRecipeInProgress,
  toggleRecipeIngredient,
  setRecipeDone,
  removeRecipeInProgress,
} from "@/store/slices/menu";
import { selectUser } from "@/store/slices/user";

import formatDateToDDMMYYYY from "@/utils/formatDateToDDMMYYYY";
import { useLoaderData } from "@/utils/reactRouterDom/reactRouterDom";
import toRecipeWithDetails from "@/utils/mappings/recipe/toRecipeWithDetails";

import { RecipeInProgressLoader } from "@/routes/routesPrivate/loaders/common.types";

export default function RecipeInProgress() {
  const data = useLoaderData<RecipeInProgressLoader>();
  const recipe = toRecipeWithDetails(data.recipe);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const ingredientsRemaining = useAppSelector((state) =>
    selectRecipeInProgressIngredients(state, recipe, user.email)
  );
  const navigate = useNavigate();
  const isRecipeInProgress = useAppSelector((state) =>
    selectIsRecipeInProgress(state, recipe, user.email)
  );

  const isAllIngredientsChecked = React.useMemo(() => {
    return ingredientsRemaining && ingredientsRemaining.length === 0;
  }, [ingredientsRemaining]);

  const handleIngredientCheck = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    const ingredient = target.name;
    const isChecked = target.checked;

    dispatch(
      toggleRecipeIngredient({
        ingredient,
        isChecked,
        recipeId: recipe.id,
        recipeType: recipe.type,
        userEmail: user.email,
      })
    );
  };

  const handleFinishRecipe = () => {
    const now = new Date();
    const todayDate = formatDateToDDMMYYYY(now);

    dispatch(
      setRecipeDone({
        userEmail: user.email,
        recipe: {
          ...recipe,
          doneDate: todayDate,
        },
      })
    );

    dispatch(
      removeRecipeInProgress({
        recipeId: recipe.id,
        recipeType: recipe.type,
        userEmail: user.email,
      })
    );

    navigate("/done-recipes");
  };

  const isIngredientChecked = (ingredient: string): boolean => {
    if (ingredientsRemaining) {
      const ingredientWasFound = ingredientsRemaining.findIndex(
        (i) => i === ingredient
      );

      return Boolean(!~ingredientWasFound);
    }

    return false;
  };

  /*
    Check if recipe is in progress in the global state,
    if not, navigate to its details page.
  **/
  React.useEffect(() => {
    if (!isRecipeInProgress) {
      navigate(`/${recipe.type}s/${recipe.id}`);
    }
  }, [isRecipeInProgress, navigate, recipe.id, recipe.type]);

  return (
    <HeroLayout recipe={recipe}>
      <Stack gap={4}>
        <Stack>
          <section>
            <h2>Ingredients</h2>
            <Form className="border-box px-4">
              {recipe.ingredientsMeasures.map(
                ([ingredient, measure], index) => {
                  const checked = isIngredientChecked(ingredient);
                  return (
                    <Form.Check id={`ingredient-${index + 1}`} key={index}>
                      <Form.Check.Input
                        type="checkbox"
                        data-testid={`${index}-ingredient-name-and-measure`}
                        onClick={handleIngredientCheck}
                        defaultChecked={checked}
                        name={ingredient}
                      />
                      <Form.Check.Label
                        className={checked ? "line-through" : ""}
                      >{`${ingredient} ${measure}`}</Form.Check.Label>
                    </Form.Check>
                  );
                }
              )}
            </Form>
          </section>

          <section>
            <h2>Instructions</h2>
            <p data-testid="instructions" className="border-box">
              {recipe.instructions}
            </p>
          </section>
        </Stack>

        {recipe.video && (
          <section className="m-0" style={{ maxWidth: 800 }}>
            <div className="ratio ratio-16x9">
              <iframe
                data-testid="video"
                title="youtube video"
                src={recipe.video.replace("watch?v=", "embed/")}
                allowFullScreen
              />
            </div>
          </section>
        )}
      </Stack>

      <button
        onClick={handleFinishRecipe}
        className="button-fixed-bottom"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={!isAllIngredientsChecked}
      >
        Finish Recipe
      </button>
    </HeroLayout>
  );
}