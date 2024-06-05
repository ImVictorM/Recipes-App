import { PlaceholderImage } from "@/assets/images";
import { getRandomBetweenInclusive } from "@/utils/random";
import { Card, Placeholder } from "react-bootstrap";

export default function RecipeSkeletonCard() {
  return (
    <Card className="shadow">
      <PlaceholderImage
        className="card-img-top"
        role="img"
        aria-label="placeholder"
      />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={getRandomBetweenInclusive(4, 11)} bg="slate" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}
