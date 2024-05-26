import { HeroLayout } from "@/layouts";
import { RecipeWithDetails } from "@/store/slices/menuSlice";
import { Form, Stack } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

export default function RecipeInProgress() {
  const recipe = useLoaderData() as RecipeWithDetails;

  const handleIngredientCheck = () => {};

  const handleFinishRecipe = () => {};

  return (
    <HeroLayout recipe={recipe}>
      <Stack gap={4}>
        <Stack>
          <section>
            <h2>Ingredients</h2>
            <Form className="recipe-ingredients border-box">
              {recipe.ingredientsMeasures.map(
                ([ingredient, measure], index) => (
                  <Form.Check
                    type="checkbox"
                    id={`ingredient-${index + 1}`}
                    data-testid={`${index}-ingredient-name-and-measure`}
                    key={index}
                    label={`${ingredient} ${measure}`}
                    onClick={handleIngredientCheck}
                    className="ingredient-checkbox"
                  />
                )
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
      >
        Finish Recipe
      </button>
    </HeroLayout>
  );
}
