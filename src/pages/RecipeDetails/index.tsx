import { useLoaderData, useNavigate } from "react-router-dom";
import { RecipeWithDetailsAndRecommendation } from "@/store/slices/menuSlice";
import { RecipeBasicCard } from "@/components";
import { Stack } from "react-bootstrap";
import { HeroLayout } from "@/layouts";
import "@/sass/pages/recipeDetails/_recipeDetails.scss";

export default function RecipeDetails() {
  const recipe = useLoaderData() as RecipeWithDetailsAndRecommendation;
  const navigate = useNavigate();

  const handleStartRecipe = () => {
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

      <button
        type="button"
        className="button-fixed-bottom"
        data-testid="start-recipe-btn"
        onClick={handleStartRecipe}
      >
        Start recipe
      </button>
    </HeroLayout>
  );
}
