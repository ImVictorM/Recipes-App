import { shareIcon, heartFillIcon, heartOutlineIcon } from "@/assets/icons";
import { useAppSelector, useAppDispatch, useClipboardCopy } from "@/hooks";
import {
  RecipeWithDetails,
  selectIsFavoriteRecipe,
  toggleFavoriteRecipe,
} from "@/store/slices/menuSlice";
import { selectUser } from "@/store/slices/userSlice";
import "@/sass/components/_recipeHero.scss";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useCallback } from "react";

export type RecipeHeroProps = {
  recipe: RecipeWithDetails;
};

export default function RecipeHero({ recipe }: RecipeHeroProps) {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { copyToClipboard, successfullyCopiedMessage } = useClipboardCopy();
  const isFavorite = useAppSelector((state) =>
    selectIsFavoriteRecipe(state, recipe.id, user.email)
  );

  const handleCopyToClipboard = () => {
    const currentUrl = window.location.href;
    copyToClipboard(currentUrl);
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

  const renderShareButtonTooltip = useCallback(
    (props: OverlayInjectedProps) => {
      return (
        <Tooltip id="tooltip" {...props}>
          {successfullyCopiedMessage}
        </Tooltip>
      );
    },
    [successfullyCopiedMessage]
  );

  return (
    <Container fluid as="section" className="hero" style={heroBackgroundStyle}>
      <Container
        fluid
        className="d-flex justify-content-end align-items-center py-4"
      >
        <div className="d-flex gap-3">
          <OverlayTrigger
            placement="bottom"
            overlay={(e) => renderShareButtonTooltip(e)}
            trigger={["hover", "focus"]}
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
        </div>
      </Container>

      <div className="hero-text">
        <h1 data-testid="recipe-title" className="hero-text-title">
          {recipe.name}
        </h1>
        <h3 data-testid="recipe-category" className="hero-text-category">
          {recipe.category}
        </h3>
      </div>

      {/* <p>{successfullyCopiedMessage}</p> */}
    </Container>
  );
}
