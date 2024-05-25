export default function RecipeInProgress() {
  // const handleChecked = ({ target }) => {
  //   const { checked } = target;

  //   const ingredientAndMeasure = target.nextSibling.innerText;
  //   const prevCopy = inProgressRecipes[keyToSearchFor][id];

  //   if (checked) {
  //     target.parentElement.className = "checked";
  //     const newList = [...prevCopy, ingredientAndMeasure];
  //     setInProgressRecipes({
  //       ...inProgressRecipes,
  //       [keyToSearchFor]: {
  //         [id]: newList,
  //       },
  //     });
  //   } else {
  //     target.parentElement.className = "noChecked";
  //     const newList = inProgressRecipes[keyToSearchFor][id].filter(
  //       (element) => element !== ingredientAndMeasure
  //     );
  //     setInProgressRecipes({
  //       ...inProgressRecipes,
  //       [keyToSearchFor]: {
  //         [id]: newList,
  //       },
  //     });
  //   }
  // };

  return (
    <div className="container justify-content-center">
      <section>
        <button type="button" data-testid="share-btn" onClick={handleCopy}>
          <img src={shareIcon} alt="Botão compartilhar" />
        </button>
        <p>{shareCopy}</p>
        <button type="button" onClick={handleFavorite}>
          <img
            data-testid="favorite-btn"
            src={
              favorites.some((element) => Number(element.id) === Number(id))
                ? blackHeartIcon
                : whiteHeartIcon
            }
            alt="Botão favoritar"
          />
        </button>
      </section>
      <img
        className="image-food"
        data-testid="recipe-photo"
        src={parameters.picture}
        alt={parameters.title}
      />
      <h1 data-testid="recipe-title">{parameters.title}</h1>
      {pathname === `/drinks/${parameters.id}/in-progress` && (
        <p data-testid="recipe-category">{parameters.alcohol}</p>
      )}
      <div>
        <h2>Ingredients</h2>
        <div className="d-flex row">
          {ingredients.map((ingredient, index) => {
            const ingredientAndMeasure = `${ingredient} ${measures[index]}`;
            const shouldBeChecked =
              inProgressRecipes[keyToSearchFor][id].includes(
                ingredientAndMeasure
              );
            return (
              <label
                htmlFor={index}
                key={index}
                className={`col-12 
                  ${shouldBeChecked ? "checked" : "noChecked"}`}
                data-testid={`${index}-ingredient-step`}
              >
                <input
                  type="checkbox"
                  className="m-2"
                  onClick={handleChecked}
                  defaultChecked={shouldBeChecked}
                />
                <span>{ingredientAndMeasure}</span>
              </label>
            );
          })}
        </div>
      </div>
      <p data-testid="recipe-category">{parameters.category}</p>
      <p data-testid="instructions">{parameters.instruction}</p>
      <button
        type="button"
        className="btn fixed-bottom"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}
