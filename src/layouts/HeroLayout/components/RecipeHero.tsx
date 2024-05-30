import { shareIcon, heartFillIcon, heartOutlineIcon } from "@/assets/icons";
import {
  useAppSelector,
  useAppDispatch,
  useCopyToClipboardWithTooltip,
} from "@/hooks";
import {
  RecipeWithDetails,
  selectIsRecipeFavorite,
  toggleRecipeFavorite,
} from "@/store/slices/menuSlice";
import { selectUser } from "@/store/slices/userSlice";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "@/sass/layouts/HeroLayout/components/RecipeHero.module.scss";
import {
  SHARE_TOOLTIP_MESSAGE_INITIAL,
  SHARE_TOOLTIP_MESSAGE_ON_COPY,
} from "@/utils/constants";

export type RecipeHeroProps = {
  recipe: RecipeWithDetails;
};

export default function RecipeHero({ recipe }: RecipeHeroProps) {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    selectIsRecipeFavorite(state, recipe.id, user.email)
  );
  const { copyAndSetTooltipMessage, tooltipMessage: shareTooltipMessage } =
    useCopyToClipboardWithTooltip(
      SHARE_TOOLTIP_MESSAGE_INITIAL,
      SHARE_TOOLTIP_MESSAGE_ON_COPY
    );

  const handleCopyToClipboard = () => {
    const endpoint = `${recipe.type}s/${recipe.id}`;
    const recipePath = `${window.origin}/${endpoint}`;

    copyAndSetTooltipMessage(recipePath);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleRecipeFavorite({ recipe: recipe, userEmail: user.email }));
  };

  const heroBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${recipe.img})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <Container
      fluid
      as="section"
      className={`${styles.hero}`}
      style={heroBackgroundStyle}
    >
      <Container
        as="header"
        fluid
        className={`${styles.hero__header} mt-2 py-4`}
      >
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
              <img
                src={shareIcon}
                alt="share"
                className={`${styles.hero__header__icon}`}
              />
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
                className={`${styles.hero__header__icon}`}
              />
            </button>
          </OverlayTrigger>
        </div>
      </Container>

      <div className={`${styles.hero__presentation}`}>
        <h1
          data-testid="recipe-title"
          className={`${styles.hero__presentation__title}`}
        >
          {recipe.name}
        </h1>
        <h4
          data-testid="recipe-category"
          className={`${styles.hero__presentation__category}`}
        >
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
