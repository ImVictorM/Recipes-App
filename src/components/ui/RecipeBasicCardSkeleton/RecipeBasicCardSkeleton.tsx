import { Card, Placeholder } from "react-bootstrap";

import PlaceholderImage from "@/assets/images/placeholderImage.svg";
import getRandomBetweenInclusive from "@/utils/getRandomBetweenInclusive";

import styles from "@/sass/components/ui/RecipeBasicCardSkeleton.module.scss";
import { TestableComponent } from "@/types/testableComponent";

export default function RecipeBasicCardSkeleton({
  prefixDataTestId = "BasicCardSkeleton",
}: TestableComponent) {
  return (
    <Card
      className={`${styles.card} shadow m-0`}
      data-testid={prefixDataTestId}
    >
      <PlaceholderImage
        role="img"
        aria-label="placeholder"
        className="card-img-top"
        data-testid={`${prefixDataTestId}.ImgPlaceholder`}
      />

      <Card.Body
        className={`${styles.card__body}`}
        data-testid={`${prefixDataTestId}.Body`}
      >
        <Placeholder
          as={Card.Title}
          animation="glow"
          data-testid={`${prefixDataTestId}.Body.TitlePlaceholder`}
        >
          <Placeholder xs={getRandomBetweenInclusive(4, 11)} bg="slate" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}
