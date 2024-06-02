import { ScrollLinearContainer, RecipeBasicCard } from "@/components";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { HeroLayout } from "@/layouts";
import {
  RecipeWithDetailsAndRecommendation,
  selectIsRecipeDone,
  selectIsRecipeInProgress,
  setRecipeInProgress,
} from "@/store/slices/menuSlice";
import { selectUser } from "@/store/slices/userSlice";
import { useRef } from "react";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "@/sass/pages/RecipeDetails/style.module.scss";

export type RecipeDetailsLoadedContentProps = {
  recipe: RecipeWithDetailsAndRecommendation;
};

export default function RecipeDetailsLoadedContent({
  recipe,
}: RecipeDetailsLoadedContentProps) {
  const user = useAppSelector(selectUser);

  const isRecipeDone = useAppSelector((state) =>
    selectIsRecipeDone(state, recipe.id, user.email)
  );
  const isRecipeInProgress = useAppSelector((state) =>
    selectIsRecipeInProgress(state, recipe, user.email)
  );

  /**
   * Needs to be static to not flicker the button text
   * when leaving the page
   */
  const isRecipeInProgressInitialStateRef = useRef(isRecipeInProgress);

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
            {recipe.recommendations.map((recipe, index) => {
              return (
                <RecipeBasicCard
                  recipe={recipe}
                  index={index}
                  key={recipe.id}
                />
              );
            })}
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
