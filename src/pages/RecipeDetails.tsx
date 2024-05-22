import { useLoaderData } from "react-router-dom";
import "../styles/pages/RecipeDetals.css";
import { shareIcon } from "@/assets/icons";
import { useClipboardCopy } from "@/hooks";

export type RecipeRecommendation = {
  name: string;
  imgSrc: string;
};

export type RecipeDetailsItem = {
  name: string;
  imgSrc: string;
  ingredientsMeasures: [string, string][];
  instructions: string;
  video?: string;
  alcoholic?: string;
  recommendedWith: RecipeRecommendation[];
  category: string;
};

export default function RecipeDetails() {
  const recipe = useLoaderData() as RecipeDetailsItem;
  const { copyToClipboard, successfullyCopiedMessage } = useClipboardCopy();

  const handleCopyToClipboard = () => {
    const currentUrl = window.location.href;
    copyToClipboard(currentUrl);
  };

  // const handleFavorite = () => {
  //   const {
  //     idDrink,
  //     idMeal,
  //     strArea,
  //     strCategory,
  //     strAlcoholic,
  //     strDrink,
  //     strMeal,
  //     strDrinkThumb,
  //     strMealThumb,
  //   } = defaultApi;
  //   const newFavorite = {
  //     id: idDrink || idMeal,
  //     type: pathname.includes("drink") ? "drink" : "meal",
  //     nationality: strArea || "",
  //     category: strCategory,
  //     alcoholicOrNot: strAlcoholic || "",
  //     name: strDrink || strMeal,
  //     image: strDrinkThumb || strMealThumb,
  //   };
  //   const recipeIsFavorite = favorites.some(
  //     (recipe) => Number(recipe.id) === Number(id)
  //   );
  //   if (recipeIsFavorite) {
  //     const removedItem = favorites.filter(
  //       (recipe) => Number(recipe.id) !== Number(id)
  //     );
  //     setInLocalStorage("favoriteRecipes", removedItem);
  //     setFavorites(removedItem);
  //   } else {
  //     setInLocalStorage("favoriteRecipes", [...favorites, newFavorite]);
  //     setFavorites([...favorites, newFavorite]);
  //   }
  // };
  // useEffect(() => {
  //   const favoriteRecipes = getFromLocalStorage("favoriteRecipes");
  //   const recipesInProgress = getFromLocalStorage("inProgressRecipes") || {};
  //   const key = pathname.includes("drinks") ? "drinks" : "meals";
  //   const keys = Object.keys(recipesInProgress[key] || []);
  //   setIsInProgress(keys.includes(id));
  //   if (favoriteRecipes !== null) {
  //     setFavorites(favoriteRecipes);
  //   }
  // }, [pathname, id]);

  // const handleStartedRecipes = () => {
  //   const defaultObj = {
  //     drinks: {},
  //     meals: {},
  //   };
  //   const inProgressRecipes =
  //     getFromLocalStorage("inProgressRecipes") || defaultObj;
  //   const key = pathname.includes("drinks") ? "drinks" : "meals";
  //   inProgressRecipes[key][id] = [];
  //   if (inProgressRecipes) {
  //     setInLocalStorage("inProgressRecipes", inProgressRecipes);
  //   }
  //   history.push(`${parameters.id}/in-progress`);
  // };

  return (
    <div className="container justify-content-center">
      <section>
        <button
          type="button"
          onClick={handleCopyToClipboard}
          data-testid="share-btn"
        >
          <img src={shareIcon} alt="share" />
        </button>

        <p>{successfullyCopiedMessage}</p>

        {/* <button type="button" onClick={handleFavorite}>
          <img
            data-testid="favorite-btn"
            src={
              favorites.some((element) => Number(element.id) === Number(id))
                ? blackHeartIcon
                : whiteHeartIcon
            }
            alt="Botão favoritar"
          />
        </button> */}
      </section>
      <img
        className="image-food"
        data-testid="recipe-photo"
        src={recipe.imgSrc}
        alt={recipe.name}
      />
      <h1 data-testid="recipe-title">{recipe.name}</h1>
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
      <p data-testid="recipe-category">{recipe.category}</p>
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
          {recipe.recommendedWith.map(({ imgSrc, name }, index) => {
            return (
              <div
                key={name}
                data-testid={`${index}-recommendation-card`}
                className="card card-body me-3"
              >
                <img
                  className="img-fluid"
                  data-testid="recipe-photo"
                  src={imgSrc}
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

      {/* <button
        type="button"
        className="btn fixed-bottom"
        data-testid="start-recipe-btn"
        onClick={handleStartedRecipes}
      >
        {isInProgress ? "Continue Recipe" : "Start Recipe"}
      </button> */}
    </div>
  );
}
