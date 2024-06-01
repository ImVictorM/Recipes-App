import {
  RecipeWithDetails,
  toggleRecipeFavorite,
} from "@/store/slices/menuSlice";
import styles from "@/sass/pages/RecipesFavorite/components/RecipeFavoriteCard.module.scss";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { HeartFillIcon, ShareIcon } from "@/assets/icons";
import {
  useAppDispatch,
  useAppSelector,
  useCopyToClipboardWithTooltip,
} from "@/hooks";
import { selectUser } from "@/store/slices/userSlice";
import {
  SHARE_TOOLTIP_MESSAGE_INITIAL,
  SHARE_TOOLTIP_MESSAGE_ON_COPY,
} from "@/utils/constants";

export type RecipeFavoriteCardProps = {
  recipe: RecipeWithDetails;
};

export default function RecipeFavoriteCard({
  recipe,
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
    <Card className="shadow">
      <Card.Link
        href={recipeEndpoint}
        className="text-decoration-none overflow-hidden rounded-top"
      >
        <Card.Img
          className={`${styles.card__img}`}
          src={img}
          alt={name}
          variant="top"
        />
      </Card.Link>

      <Card.Body>
        <Card.Link
          href={recipeEndpoint}
          className="d-flex text-decoration-none overflow-hidden mb-1"
        >
          <Card.Title
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

        <div className={`${styles.card__buttons} mt-2`}>
          <OverlayTrigger
            overlay={(props) => (
              <Tooltip id="share-button" {...props}>
                {tooltipMessage}
              </Tooltip>
            )}
          >
            <button
              onClick={handleCopyRecipeLink}
              className={`${styles.card__buttons__share}`}
            >
              <ShareIcon role="img" aria-label="share" />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={(props) => (
              <Tooltip id="unfavorite-button" {...props}>
                Unfavorite recipe
              </Tooltip>
            )}
            placement="top"
          >
            <button
              onClick={handleToggleRecipeFavorite}
              className={`${styles.card__buttons__favorite}`}
            >
              <HeartFillIcon role="img" aria-label="fill heart" />
            </button>
          </OverlayTrigger>
        </div>
      </Card.Body>
    </Card>
  );
}
