import { RecipeDone } from "@/store/slices/menuSlice";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "@/sass/pages/RecipesDone/components/RecipeDoneCard.module.scss";
import { shareIcon } from "@/assets/icons";
import { useCopyToClipboardWithTooltip } from "@/hooks";
import {
  SHARE_TOOLTIP_MESSAGE_INITIAL,
  SHARE_TOOLTIP_MESSAGE_ON_COPY,
} from "@/utils/constants";

export type RecipeDoneCardProps = {
  recipe: RecipeDone;
};

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
              className={`${styles.card__title} m-0`}
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
              <img src={shareIcon} alt="share" />
            </button>
          </OverlayTrigger>
        </div>

        <div className="d-flex align-items-end justify-content-between">
          <Card.Subtitle
            title={recipeSubtitle}
            as="h6"
            className={`${styles.card__subtitle}`}
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

        <ul className={`${styles.cards__tags} snaps-inline`}>
          {recipe.tags.map((tag) => (
            <li key={tag} className={`${styles.card__tags__tag}`}>
              {tag}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}
