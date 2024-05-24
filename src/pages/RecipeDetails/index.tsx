import { useLoaderData, useNavigate } from "react-router-dom";
import { RecipeWithDetails } from "@/store/slices/menuSlice";
import { RecipeBasicCard, RecipeHero } from "@/components";
import { Button, Container, Stack } from "react-bootstrap";
import "@/sass/pages/recipeDetails/_recipeDetails.scss";

export default function RecipeDetails() {
  const recipe = useLoaderData() as RecipeWithDetails;
  const navigate = useNavigate();

  const handleStartRecipe = () => {
    navigate("in-progress");
  };

  return (
    <main>
      <RecipeHero recipe={recipe} />

      <Stack className="recipe-content" gap={4}>
        <Stack>
          <Container fluid as="section">
            <h2>Ingredients</h2>
            <ul className="recipe-content-ingredients border-box">
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
          </Container>

          <Container fluid as="section">
            <h2>Instructions</h2>
            <p data-testid="instructions" className="border-box">
              {recipe.instructions}
            </p>
          </Container>
        </Stack>

        {recipe.video && (
          <Container fluid as="section">
            <div className="ratio ratio-16x9">
              <iframe
                data-testid="video"
                title="youtube video"
                src={recipe.video.replace("watch?v=", "embed/")}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </Container>
        )}

        <Container fluid as="section">
          <h3>Recommended drinks</h3>
          <div className="recipe-content-recommended snaps-inline">
            {recipe.recommendedWith.map((recipe, index) => {
              return (
                <RecipeBasicCard
                  recipe={recipe}
                  index={index}
                  key={recipe.id}
                />
              );
            })}
          </div>
        </Container>
      </Stack>

      <Button
        variant="primary"
        type="button"
        className="fixed-bottom my-0"
        data-testid="start-recipe-btn"
        onClick={handleStartRecipe}
      >
        Start recipe
      </Button>
    </main>
  );
}
