import React from "react";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import HeroLayout from "@/layouts/HeroLayout";

import RecipeBasicCard from "@/components/RecipeBasicCard";
import RecipeBasicCardSkeleton from "@/components/RecipeBasicCardSkeleton";
import ScrollLinearContainer from "@/components/ScrollLinearContainer";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

import toRecipe from "@/utils/mappings/recipe/toRecipe";
import toRecipeWithDetails from "@/utils/mappings/recipe/toRecipeWithDetails";
import { Await, useLoaderData } from "@/utils/reactRouterDom/reactRouterDom";

import {
  selectIsRecipeDone,
  selectIsRecipeInProgress,
  setRecipeInProgress,
} from "@/store/slices/menu";
import { selectUser } from "@/store/slices/user";

import { RecipeDetailsLoader } from "@/routes/routesPrivate/loaders/common.types";

import styles from "@/sass/pages/RecipeDetails/RecipeDetails.module.scss";

export default function RecipeDetails() {
  const data = useLoaderData<RecipeDetailsLoader>();
  const recipe = toRecipeWithDetails(data.recipe);

  const user = useAppSelector(selectUser);

  const isRecipeDone = useAppSelector((state) =>
    selectIsRecipeDone(state, recipe.id, user.email)
  );
  const isRecipeInProgress = useAppSelector((state) =>
    selectIsRecipeInProgress(state, recipe, user.email)
  );

  /**
   * Needs to be static to not flicker the button text
   * when leaving the page.
   */
  const isRecipeInProgressInitialStateRef = React.useRef(isRecipeInProgress);

  const handleStartRecipe = () => {
    dispatch(setRecipeInProgress({ userEmail: user.email, recipe: recipe }));
    navigate("in-progress");
  };

  const handleContinueRecipe = () => {
    navigate("in-progress");
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <HeroLayout recipe={recipe}>
      <Stack gap={4}>
        <Stack>
          <section>
            <h2>Ingredients</h2>
            <ul className="ps-5 border-box">
              {recipe.ingredientsMeasures.map(
                ([ingredient, measure], index) => (
                  <li
                    data-testid={`${index}-ingredient-name-and-measure`}
                    key={index}
                  >
                    {`${ingredient} ${measure}`}
                  </li>
                )
              )}
            </ul>
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

        <section>
          <h3>Recommended drinks</h3>
          <ScrollLinearContainer
            className={`${styles.recipe__recommendations}`}
          >
            <React.Suspense
              fallback={
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <RecipeBasicCardSkeleton key={index} />
                  ))}
                </>
              }
            >
              <Await
                resolve={data.recommendations}
                errorElement={
                  <div>
                    <p className="text-muted">
                      There was an error trying to load the recommendations.
                    </p>
                  </div>
                }
              >
                {(recommendations) => {
                  return (
                    <>
                      {recommendations.map(toRecipe).map((recipe, index) => {
                        return (
                          <RecipeBasicCard
                            recipe={recipe}
                            index={index}
                            key={recipe.id}
                          />
                        );
                      })}
                    </>
                  );
                }}
              </Await>
            </React.Suspense>
          </ScrollLinearContainer>
        </section>
      </Stack>

      {!isRecipeDone &&
        (isRecipeInProgressInitialStateRef.current ? (
          <button
            type="button"
            className="button-fixed-bottom"
            data-testid="continue-recipe-btn"
            onClick={handleContinueRecipe}
          >
            Continue recipe
          </button>
        ) : (
          <button
            type="button"
            className="button-fixed-bottom"
            data-testid="start-recipe-btn"
            onClick={handleStartRecipe}
          >
            Start recipe
          </button>
        ))}
    </HeroLayout>
  );
}
