import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";

import useAppSelector from "@/hooks/useAppSelector";
import useAppDispatch from "@/hooks/useAppDispatch";
import useCopyToClipboardWithTooltip from "@/hooks/useCopyToClipboardWithTooltip";

import { selectUser } from "@/store/slices/user";
import { toggleRecipeFavorite } from "@/store/slices/menu";

import {
  SHARE_TOOLTIP_MESSAGE_INITIAL,
  SHARE_TOOLTIP_MESSAGE_ON_COPY,
} from "@/utils/constants";

import ShareIcon from "@/assets/icons/shareIcon.svg";
import HeartFillIcon from "@/assets/icons/heartFillIcon.svg";

import { RecipeFavoriteCardProps } from "./RecipeFavoriteCard.types";

import styles from "@/sass/pages/RecipesFavorite/components/RecipeFavoriteCard.module.scss";

export default function RecipeFavoriteCard({
  recipe,
  prefixDataTestId = "RecipeFavoriteCard",
}: RecipeFavoriteCardProps) {
  const { img, name } = recipe;
  const recipeSubtitle = recipe.nationality
    ? `${recipe.nationality} - ${recipe.category}`
    : recipe.category;
  const recipeEndpoint = `${recipe.type}s/${recipe.id}`;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { copyAndSetTooltipMessage, tooltipMessage } =
    useCopyToClipboardWithTooltip(
      SHARE_TOOLTIP_MESSAGE_INITIAL,
      SHARE_TOOLTIP_MESSAGE_ON_COPY
    );

  const handleToggleRecipeFavorite = () => {
    dispatch(toggleRecipeFavorite({ recipe: recipe, userEmail: user.email }));
  };

  const handleCopyRecipeLink = () => {
    const recipePath = `${window.origin}/${recipeEndpoint}`;
    copyAndSetTooltipMessage(recipePath);
  };

  return (
    <Card className="shadow" data-testid={prefixDataTestId}>
      <Card.Link
        href={recipeEndpoint}
        className="text-decoration-none overflow-hidden rounded-top"
        data-testid={`${prefixDataTestId}.LinkImg`}
      >
        <Card.Img
          className={`${styles.card__img}`}
          src={img}
          alt={name}
          variant="top"
          data-testid={`${prefixDataTestId}.LinkImg.Img`}
        />
      </Card.Link>

      <Card.Body data-testid={`${prefixDataTestId}.Body`}>
        <Card.Link
          data-testid={`${prefixDataTestId}.Body.LinkTitle`}
          href={recipeEndpoint}
          className="d-flex text-decoration-none overflow-hidden mb-1"
        >
          <Card.Title
            data-testid={`${prefixDataTestId}.Body.LinkTitle.Title`}
            className={`${styles.card__title} text-truncate m-0`}
            title={name}
          >
            {name}
          </Card.Title>
        </Card.Link>

        <div className="d-flex align-items-end justify-content-between">
          <Card.Subtitle
            as="h6"
            bsPrefix={`${styles.card__subtitle} text-truncate m-0`}
            title={recipeSubtitle}
            data-testid={`${prefixDataTestId}.Body.Subtitle`}
          >
            {recipeSubtitle}
          </Card.Subtitle>

          {recipe.alcoholic && (
            <Card.Text
              as="span"
              data-testid={`${prefixDataTestId}.Body.Alcoholic`}
              className={`${styles.card__alcoholic} flex-shrink-0`}
            >
              {recipe.alcoholic}
            </Card.Text>
          )}
        </div>

        <div className={`${styles.card__buttons} mt-2`}>
          <OverlayTrigger
            overlay={(props) => (
              <Tooltip id="share-button" {...props}>
                <span
                  data-testid={`${prefixDataTestId}.Body.ButtonShare.Tooltip`}
                >
                  {tooltipMessage}
                </span>
              </Tooltip>
            )}
          >
            <button
              onClick={handleCopyRecipeLink}
              className={`${styles.card__buttons__share}`}
              data-testid={`${prefixDataTestId}.Body.ButtonShare`}
            >
              <ShareIcon role="img" aria-label="share" />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={(props) => (
              <Tooltip id="unfavorite-button" {...props}>
                <span data-testid={`${prefixDataTestId}.Body.ButtonUnfavorite`}>
                  Unfavorite recipe
                </span>
              </Tooltip>
            )}
            placement="top"
          >
            <button
              onClick={handleToggleRecipeFavorite}
              className={`${styles.card__buttons__favorite}`}
              data-testid={`${prefixDataTestId}.Body.ButtonUnfavorite`}
            >
              <HeartFillIcon role="img" aria-label="fill heart" />
            </button>
          </OverlayTrigger>
        </div>
      </Card.Body>
    </Card>
  );
}
