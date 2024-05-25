import { shareIcon, heartFillIcon, heartOutlineIcon } from "@/assets/icons";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  RecipeWithDetails,
  selectIsFavoriteRecipe,
  toggleFavoriteRecipe,
} from "@/store/slices/menuSlice";
import { selectUser } from "@/store/slices/userSlice";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { copyToClipboard } from "@/utils/clipboard";
import { useState } from "react";
import "@/sass/components/_recipeHero.scss";

export type RecipeHeroProps = {
  recipe: RecipeWithDetails;
};

export default function RecipeHero({ recipe }: RecipeHeroProps) {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    selectIsFavoriteRecipe(state, recipe.id, user.email)
  );
  const [shareTooltipMessage, setShareTooltipMessage] =
    useState("Copy recipe link");

  const handleCopyToClipboard = () => {
    const endpoint =
      recipe.type === "meal" ? `meals/${recipe.id}` : `drinks/${recipe.id}`;
    const recipePath = `${window.origin}/${endpoint}`;

    copyToClipboard(recipePath);
    setShareTooltipMessage("Recipe link copied!");

    setTimeout(() => {
      setShareTooltipMessage("Copy recipe link");
    }, 3000);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteRecipe({ recipe: recipe, userEmail: user.email }));
  };

  const heroBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${recipe.img})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <Container fluid as="section" className="hero" style={heroBackgroundStyle}>
      <Container fluid className="hero-container mt-2 py-4">
        <div className="d-flex gap-3">
          <OverlayTrigger
            placement="left-end"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => (
              <Tooltip id="copy-recipe-link-tooltip" {...props}>
                {shareTooltipMessage}
              </Tooltip>
            )}
          >
            <button
              type="button"
              onClick={handleCopyToClipboard}
              data-testid="share-btn"
              className="bg-transparent"
            >
              <img src={shareIcon} alt="share" className="icon" />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="left-end"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => (
              <Tooltip id="favorite-tooltip" {...props}>
                {isFavorite ? "Unfavorite recipe" : "Favorite recipe"}
              </Tooltip>
            )}
          >
            <button
              type="button"
              onClick={handleToggleFavorite}
              className="bg-transparent"
              data-testid="favorite-btn"
            >
              <img
                src={isFavorite ? heartFillIcon : heartOutlineIcon}
                alt="heart"
                className="icon"
              />
            </button>
          </OverlayTrigger>
        </div>
      </Container>

      <div className="hero-text">
        <h1 data-testid="recipe-title" className="hero-text-title">
          {recipe.name}
        </h1>
        <h4 data-testid="recipe-category" className="hero-text-category">
          {recipe.alcoholic ? (
            <>
              <span data-testid="recipe-alcoholic">{recipe.alcoholic}</span>{" "}
              {recipe.category}
            </>
          ) : (
            recipe.category
          )}
        </h4>
      </div>
    </Container>
  );
}
