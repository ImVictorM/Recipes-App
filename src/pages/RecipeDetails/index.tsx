import { useLoaderData, useNavigate } from "react-router-dom";
import { RecipeWithDetails } from "@/store/slices/menuSlice";
import { RecipeHero } from "@/components";

export type RecipeDetailsProps = {
  inProgress?: boolean;
};

export default function RecipeDetails({ inProgress }: RecipeDetailsProps) {
  const recipe = useLoaderData() as RecipeWithDetails;
  const navigate = useNavigate();

  const handleStartRecipe = () => {
    navigate("in-progress");
  };

  return (
    <div>
      <RecipeHero recipe={recipe} />

      {recipe.alcoholic && (
        <p data-testid="recipe-category">{recipe.alcoholic}</p>
      )}

      <div>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredientsMeasures.map(([ingredient, measure], index) => (
            <li
              data-testid={`${index}-ingredient-name-and-measure`}
              key={index}
            >
              {`${ingredient} ${measure}`}
            </li>
          ))}
        </ul>
      </div>

      <p data-testid="instructions">{recipe.instructions}</p>

      {recipe.video && (
        <div className="ratio ratio-16x9 mb-3">
          <iframe
            data-testid="video"
            title="youtube video"
            src={recipe.video.replace("watch?v=", "embed/")}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <div className="row">
        <div className="scrolling-wrapper">
          {recipe.recommendedWith.map(({ img, name }, index) => {
            return (
              <div
                key={name}
                data-testid={`${index}-recommendation-card`}
                className="card card-body me-3"
              >
                <img
                  className="img-fluid"
                  data-testid="recipe-photo"
                  src={img}
                  alt={name}
                />
                <p
                  data-testid={`${index}-recommendation-title`}
                  className="text-center"
                >
                  {name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {!inProgress && (
        <button
          type="button"
          className="btn fixed-bottom"
          data-testid="start-recipe-btn"
          onClick={handleStartRecipe}
        >
          Start recipe
        </button>
      )}
    </div>
  );
}
