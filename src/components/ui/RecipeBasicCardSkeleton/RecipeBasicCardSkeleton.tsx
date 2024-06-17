import { Card, Placeholder } from "react-bootstrap";

import PlaceholderImage from "@/assets/images/placeholderImage.svg";
import getRandomBetweenInclusive from "@/utils/getRandomBetweenInclusive";

import styles from "@/sass/components/ui/RecipeBasicCardSkeleton.module.scss";

export default function RecipeBasicCardSkeleton() {
  return (
    <Card className={`${styles.card} shadow m-0`}>
      <PlaceholderImage
        role="img"
        aria-label="placeholder"
        className="card-img-top"
      />

      <Card.Body className={`${styles.card__body}`}>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={getRandomBetweenInclusive(4, 11)} bg="slate" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}
