import { useLoaderData, useNavigate } from "react-router-dom";
import {
  RecipeWithDetailsAndRecommendation,
  selectIsRecipeDone,
  selectIsRecipeInProgress,
  setRecipeInProgress,
} from "@/store/slices/menuSlice";
import { RecipeBasicCard } from "@/components";
import { Stack } from "react-bootstrap";
import { HeroLayout } from "@/layouts";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectUser } from "@/store/slices/userSlice";
import { useRef } from "react";
import "@/sass/pages/recipeDetails/_recipeDetails.scss";

export default function RecipeDetails() {
  const recipe = useLoaderData() as RecipeWithDetailsAndRecommendation;
  const user = useAppSelector(selectUser);
  const isRecipeAlreadyDone = useAppSelector((state) =>
    selectIsRecipeDone(state, recipe.id, user.email)
  );
  const isRecipeInProgress = useAppSelector((state) =>
    selectIsRecipeInProgress(state, recipe, user.email)
  );
  // Needs to be static to no flicker the button
  const isRecipeInProgressInitialStateRef = useRef(isRecipeInProgress);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStartRecipe = () => {
    dispatch(setRecipeInProgress({ userEmail: user.email, recipe: recipe }));
    navigate("in-progress");
  };

  const handleContinueRecipe = () => {
    navigate("in-progress");
  };

  return (
    <HeroLayout recipe={recipe}>
      <Stack gap={4}>
        <Stack>
          <section>
            <h2>Ingredients</h2>
            <ul className="recipe-ingredients border-box">
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
          <div className="recipe-content-recommended snaps-inline">
            {recipe.recommendations.map((recipe, index) => {
              return (
                <RecipeBasicCard
                  recipe={recipe}
                  index={index}
                  key={recipe.id}
                />
              );
            })}
          </div>
        </section>
      </Stack>

      {!isRecipeAlreadyDone &&
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
