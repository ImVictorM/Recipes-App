import { Card, Placeholder } from "react-bootstrap";

import PlaceholderImage from "@/assets/images/placeholderImage.svg";
import getRandomBetweenInclusive from "@/utils/getRandomBetweenInclusive";

import styles from "@/sass/components/ui/RecipeBasicCardSkeleton.module.scss";

export default function RecipeBasicCardSkeleton() {
  return (
    <Card
      className={`${styles.card} shadow m-0`}
      data-testid="BasicCardSkeleton"
    >
      <PlaceholderImage
        role="img"
        aria-label="placeholder"
        className="card-img-top"
        data-testid="BasicCardSkeleton.ImgPlaceholder"
      />

      <Card.Body
        className={`${styles.card__body}`}
        data-testid="BasicCardSkeleton.Body"
      >
        <Placeholder
          as={Card.Title}
          animation="glow"
          data-testid="BasicCardSkeleton.Body.TitlePlaceholder"
        >
          <Placeholder xs={getRandomBetweenInclusive(4, 11)} bg="slate" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}
