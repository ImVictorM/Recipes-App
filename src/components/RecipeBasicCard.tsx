import { Card, Container } from "react-bootstrap";
import { Recipe } from "@/store/slices/menuSlice";
import styles from "@/sass/components/RecipeBasicCard.module.scss";

export type RecipeBasicCardProps = {
  recipe: Recipe;
  scaleOnHover?: boolean;
  index: number;
};

export default function RecipeBasicCard({
  recipe: { id, img, name, type },
  scaleOnHover,
  index,
}: RecipeBasicCardProps) {
  return (
    <Card
      className={`${styles["recipe-card"]} ${
        scaleOnHover ? `${styles["recipe-card--scale-on-hover"]}` : ""
      } shadow m-0`}
    >
      <Card.Link
        href={type === "meal" ? `/meals/${id}` : `/drinks/${id}`}
        className="text-decoration-none"
      >
        <Container fluid className={`${styles["recipe-card__img"]}`}>
          <Card.Img
            variant="top"
            src={img}
            alt={name}
            data-testid={`${index}-card-img`}
          />
        </Container>

        <Card.Body className={`${styles["recipe-card__body"]}`}>
          <Card.Title
            className={`${styles["recipe-card__body__title"]}`}
            title={name}
            data-testid={`${index}-card-name`}
          >
            {name}
          </Card.Title>
        </Card.Body>
      </Card.Link>
    </Card>
  );
}
