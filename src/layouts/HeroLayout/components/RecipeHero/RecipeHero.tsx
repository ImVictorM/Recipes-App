import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";

import ShareIcon from "@/assets/icons/shareIcon.svg";
import HeartFillIcon from "@/assets/icons/heartFillIcon.svg";
import HeartOutlineIcon from "@/assets/icons/heartOutlineIcon.svg";

import useAppSelector from "@/hooks/useAppSelector";
import useAppDispatch from "@/hooks/useAppDispatch";
import useCopyToClipboardWithTooltip from "@/hooks/useCopyToClipboardWithTooltip";

import {
  SHARE_TOOLTIP_MESSAGE_INITIAL,
  SHARE_TOOLTIP_MESSAGE_ON_COPY,
} from "@/utils/constants";

import { selectUser } from "@/store/slices/user";
import {
  selectIsRecipeFavorite,
  toggleRecipeFavorite,
} from "@/store/slices/menu";

import styles from "@/sass/layouts/HeroLayout/components/RecipeHero.module.scss";

import { RecipeHeroProps } from "./RecipeHero.types";

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
      data-testid="HeroLayout.Hero"
    >
      <Container
        as="header"
        fluid
        className={`${styles.hero__header} mt-2 py-4`}
      >
        <div className="d-flex gap-3">
          <OverlayTrigger
            placement="bottom-end"
            overlay={(props) => (
              <Tooltip {...props} id="copy-recipe-link-tooltip">
                <span data-testid="HeroLayout.Hero.Header.ButtonShare.Tooltip">
                  {shareTooltipMessage}
                </span>
              </Tooltip>
            )}
          >
            <button
              type="button"
              onClick={handleCopyToClipboard}
              data-testid="HeroLayout.Hero.Header.ButtonShare"
              className={`${styles.hero__header__icon} bg-transparent`}
            >
              <ShareIcon aria-label="share" role="img" />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom-end"
            overlay={(props) => (
              <Tooltip {...props} id="favorite-tooltip">
                <span data-testid="HeroLayout.Hero.Header.ButtonFavorite.Tooltip">
                  {isFavorite ? "Unfavorite recipe" : "Favorite recipe"}
                </span>
              </Tooltip>
            )}
          >
            <button
              type="button"
              onClick={handleToggleFavorite}
              data-testid="HeroLayout.Hero.Header.ButtonFavorite"
              className={`${styles.hero__header__icon} bg-transparent`}
            >
              {isFavorite ? (
                <HeartFillIcon aria-label="fill heart" role="img" />
              ) : (
                <HeartOutlineIcon
                  aria-label="outline hollow heart"
                  role="img"
                />
              )}
            </button>
          </OverlayTrigger>
        </div>
      </Container>

      <div className={`${styles.hero__presentation}`}>
        <h1
          data-testid="HeroLayout.Hero.Presentation.Title"
          className={`${styles.hero__presentation__title}`}
        >
          {recipe.name}
        </h1>
        <h4
          data-testid="HeroLayout.Hero.Presentation.Subtitle"
          className={`${styles.hero__presentation__category}`}
        >
          {recipe.alcoholic?.toLowerCase() === "alcoholic" ? (
            <>
              <span data-testid="HeroLayout.Hero.Presentation.Subtitle.Alcoholic">
                {recipe.alcoholic}
              </span>{" "}
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
