import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";

import ScrollLinearContainer from "@/components/ScrollLinearContainer";

import useCopyToClipboardWithTooltip from "@/hooks/useCopyToClipboardWithTooltip";

import {
  SHARE_TOOLTIP_MESSAGE_INITIAL,
  SHARE_TOOLTIP_MESSAGE_ON_COPY,
} from "@/utils/constants";

import ShareIcon from "@/assets/icons/shareIcon.svg";

import { RecipeDoneCardProps } from "./RecipeDoneCard.types";

import styles from "@/sass/pages/RecipesDone/components/RecipeDoneCard.module.scss";

export default function RecipeDoneCard({ recipe }: RecipeDoneCardProps) {
  const recipeEndpoint = `/${recipe.type}s/${recipe.id}`;
  const { copyAndSetTooltipMessage, tooltipMessage } =
    useCopyToClipboardWithTooltip(
      SHARE_TOOLTIP_MESSAGE_INITIAL,
      SHARE_TOOLTIP_MESSAGE_ON_COPY
    );

  const recipeSubtitle = recipe.nationality
    ? `${recipe.nationality} - ${recipe.category}`
    : recipe.category;

  const handleCopyRecipeLink = () => {
    const recipePath = `${window.origin}${recipeEndpoint}`;
    copyAndSetTooltipMessage(recipePath);
  };

  return (
    <Card className="shadow">
      <Card.Link
        href={recipeEndpoint}
        className="text-decoration-none overflow-hidden rounded-top"
      >
        <Card.Img
          className={`${styles.card__img}`}
          src={recipe.img}
          alt={recipe.name}
          variant="top"
        />
      </Card.Link>

      <Card.Body className={`${styles.card__body}`}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Link
            className="text-decoration-none overflow-hidden"
            href={recipeEndpoint}
          >
            <Card.Title
              className={`${styles.card__title} text-truncate m-0`}
              title={recipe.name}
              as="h5"
            >
              {recipe.name}
            </Card.Title>
          </Card.Link>

          <OverlayTrigger
            placement="left-end"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => (
              <Tooltip id="copy-recipe-link-tooltip" {...props}>
                {tooltipMessage}
              </Tooltip>
            )}
          >
            <button
              type="button"
              onClick={handleCopyRecipeLink}
              data-testid="share-btn"
              className={`${styles.card__share} flex-shrink-0`}
            >
              <ShareIcon role="img" aria-label="share" />
            </button>
          </OverlayTrigger>
        </div>

        <div className="d-flex align-items-end justify-content-between">
          <Card.Subtitle
            title={recipeSubtitle}
            as="h6"
            bsPrefix={`${styles.card__subtitle} m-0 text-truncate`}
          >
            {recipeSubtitle}
          </Card.Subtitle>

          {recipe.alcoholic && (
            <Card.Text
              as="span"
              className={`${styles.card__alcoholic} flex-shrink-0`}
            >
              {recipe.alcoholic}
            </Card.Text>
          )}
        </div>

        <Card.Text className={`${styles.card__done}`}>
          {`Done in: ${recipe.doneDate}`}
        </Card.Text>

        <ScrollLinearContainer
          as="ul"
          className={`${styles.cards__tags} hide-scroll`}
        >
          {recipe.tags.map((tag) => (
            <li key={tag} className={`${styles.card__tags__tag}`}>
              {tag}
            </li>
          ))}
        </ScrollLinearContainer>
      </Card.Body>
    </Card>
  );
}
